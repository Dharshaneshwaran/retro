import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { FileText, Download } from "lucide-react";
import { retroStyles } from "../styles/common";

function MergePDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles]);
    setMergedPdfUrl(null); // Clear previous merge results
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
  });

  const handleMerge = async () => {
    if (files.length < 2) {
      alert("Please upload at least two PDF files to merge.");
      return;
    }

    setMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const fileData = await file.arrayBuffer();
        const pdf = await PDFDocument.load(fileData);

        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setMergedPdfUrl(url);
    } catch (error) {
      console.error("Error merging PDFs:", error);
      alert("An error occurred while merging the PDF files. Please try again.");
    } finally {
      setMerging(false);
    }
  };

  const handleDownload = () => {
    if (!mergedPdfUrl) return;

    const a = document.createElement("a");
    a.href = mergedPdfUrl;
    a.download = "merged.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={retroStyles.container}>
      <h1 style={retroStyles.title}>Merge PDF Files</h1>
      <p style={retroStyles.subtitle}>
        Upload multiple PDF files to merge them into a single document.
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
            Drag & drop your PDF files here, or click to select
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {files.map((file, index) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                {file.name}
              </li>
            ))}
          </ul>

          <button
            onClick={handleMerge}
            disabled={merging}
            style={{
              ...retroStyles.button,
              marginTop: "2rem",
              opacity: merging ? 0.7 : 1,
            }}
          >
            {merging ? "Merging..." : "Merge PDFs"}
          </button>

          {merging && (
            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.9rem",
                color: "#7a5230",
                fontStyle: "italic",
              }}
            >
              Merging your PDFs, please wait...
            </p>
          )}

          {mergedPdfUrl && (
            <div style={{ marginTop: "2rem" }}>
              <button
                onClick={handleDownload}
                style={{
                  ...retroStyles.button,
                  marginTop: "1rem",
                }}
              >
                <Download size={20} />
                Download Merged PDF
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MergePDF;
