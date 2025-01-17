import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { jsPDF } from "jspdf";
import { FileText, Download } from "lucide-react";
import { retroStyles } from "../styles/common";

function TxtToPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setPdfUrl(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
    },
    multiple: false,
  });

  const handleConvert = async () => {
    if (!file) return;

    setConverting(true);

    const reader = new FileReader();
    reader.onload = () => {
      const textContent = reader.result as string;

      // Generate PDF using jsPDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      // Set smaller font size and add text content
      pdf.setFontSize(10);
      const pageWidth = pdf.internal.pageSize.getWidth() - 40; // Accounting for margins
      const pageHeight = pdf.internal.pageSize.getHeight() - 40; // Accounting for margins
      const lineHeight = 12;
      const textLines = pdf.splitTextToSize(textContent, pageWidth);
      let cursorY = 40; // Start at the top with some margin

      textLines.forEach((line: string) => {
        if (cursorY + lineHeight > pageHeight) {
          pdf.addPage(); // Add new page if content overflows
          cursorY = 40;
        }
        pdf.text(line, 20, cursorY); // Add text line by line
        cursorY += lineHeight;
      });

      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setConverting(false);
    };
    reader.readAsText(file);
  };

  const handleDownload = () => {
    if (!pdfUrl) return;

    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "converted.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={retroStyles.container}>
      <h1 style={retroStyles.title}>TXT to PDF Converter</h1>
      <p style={retroStyles.subtitle}>
        Convert your plain text files into a PDF document.
      </p>

      <div
        {...getRootProps()}
        style={{
          ...retroStyles.dropZone,
          backgroundColor: isDragActive ? "#e6d5c7" : "#f8f4f1",
          transform: isDragActive ? "scale(1.02)" : "scale(1)",
        }}
      >
        <input {...getInputProps()} />
        <div style={{ textAlign: "center" }}>
          <FileText size={48} style={{ margin: "0 auto", color: "#7a5230" }} />
          <p style={{ marginTop: "1rem", color: "#3e2723" }}>
            Drag & drop your TXT file here, or click to select
          </p>
        </div>
      </div>

      {file && (
        <div style={{ marginTop: "2rem" }}>
          <div style={retroStyles.filePreview}>
            <span style={{ fontSize: "1.1rem" }}>{file.name}</span>
          </div>

          <button
            onClick={handleConvert}
            disabled={converting}
            style={{
              ...retroStyles.button,
              marginTop: "2rem",
              opacity: converting ? 0.7 : 1,
            }}
          >
            {converting ? "Converting..." : "Convert to PDF"}
          </button>

          {converting && (
            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.9rem",
                color: "#7a5230",
                fontStyle: "italic",
              }}
            >
              Converting your file to PDF, please wait...
            </p>
          )}

          {pdfUrl && (
            <div style={{ marginTop: "2rem" }}>
              <button
                onClick={handleDownload}
                style={{
                  ...retroStyles.button,
                  marginTop: "1rem",
                }}
              >
                <Download size={20} />
                Download PDF
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TxtToPdf;
