import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import MarkdownIt from "markdown-it";
import { jsPDF } from "jspdf";
import { FileText, Download } from "lucide-react";
import { retroStyles } from "../styles/common";

function MarkdownToPdf() {
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
      "text/markdown": [".md"],
      "text/plain": [".txt"],
    },
    multiple: false,
  });

  const handleConvert = async () => {
    if (!file) return;

    setConverting(true);

    const reader = new FileReader();
    reader.onload = () => {
      const markdownContent = reader.result as string;

      // Convert Markdown to HTML using markdown-it
      const md = new MarkdownIt();
      const htmlContent = md.render(markdownContent);

      // Generate PDF from HTML content using jsPDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      // Set smaller font size
      pdf.setFontSize(6); // Makes the text even smaller

      pdf.html(htmlContent, {
        callback: (doc) => {
          const blob = doc.output("blob");
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
          setConverting(false);
        },
        x: 10,
        y: 10,
        html2canvas: {
          scale: 0.6, // Reduces scaling for smaller text
        },
      });
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
      <h1 style={retroStyles.title}>Markdown to PDF Converter</h1>
      <p style={retroStyles.subtitle}>
        Convert your Markdown files to a structured and well-formatted PDF.
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
            Drag & drop your Markdown file here, or click to select
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

export default MarkdownToPdf;
