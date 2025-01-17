import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { FileText, Download } from "lucide-react";
import { retroStyles } from "../styles/common";

function SplitPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [splitting, setSplitting] = useState(false);
  const [splitPdfUrls, setSplitPdfUrls] = useState<string[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setSplitPdfUrls([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const handleSplit = async () => {
    if (!file) {
      alert("Please upload a PDF file to split.");
      return;
    }

    setSplitting(true);

    try {
      const fileData = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileData);
      const totalPages = pdf.getPageCount();

      const splitUrls: string[] = [];

      for (let i = 0; i < totalPages; i++) {
        const splitPdf = await PDFDocument.create();
        const [page] = await splitPdf.copyPages(pdf, [i]);
        splitPdf.addPage(page);

        const splitPdfBytes = await splitPdf.save();
        const blob = new Blob([splitPdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        splitUrls.push(url);
      }

      setSplitPdfUrls(splitUrls);
    } catch (error) {
      console.error("Error splitting PDF:", error);
      alert("An error occurred while splitting the PDF. Please try again.");
    } finally {
      setSplitting(false);
    }
  };

  const handleDownload = (url: string, index: number) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `page-${index + 1}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={retroStyles.container}>
      <h1 style={retroStyles.title}>Split PDF</h1>
      <p style={retroStyles.subtitle}>
        Upload a PDF file to split it into individual pages.
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
            Drag & drop your PDF file here, or click to select
          </p>
        </div>
      </div>

      {file && (
        <div style={{ marginTop: "2rem" }}>
          <div style={retroStyles.filePreview}>
            <span style={{ fontSize: "1.1rem" }}>{file.name}</span>
          </div>

          <button
            onClick={handleSplit}
            disabled={splitting}
            style={{
              ...retroStyles.button,
              marginTop: "2rem",
              opacity: splitting ? 0.7 : 1,
            }}
          >
            {splitting ? "Splitting..." : "Split PDF"}
          </button>

          {splitting && (
            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.9rem",
                color: "#7a5230",
                fontStyle: "italic",
              }}
            >
              Splitting your PDF, please wait...
            </p>
          )}

          {splitPdfUrls.length > 0 && (
            <div style={{ marginTop: "2rem" }}>
              <h2 style={retroStyles.subtitle}>Download Split Pages</h2>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {splitPdfUrls.map((url, index) => (
                  <li key={index} style={{ marginBottom: "1rem" }}>
                    <button
                      onClick={() => handleDownload(url, index)}
                      style={{
                        ...retroStyles.button,
                      }}
                    >
                      <Download size={20} />
                      Download Page {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SplitPDF;
