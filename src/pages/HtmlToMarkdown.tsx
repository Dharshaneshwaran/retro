import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import TurndownService from "turndown";
import { FileText, Download } from "lucide-react";
import { retroStyles } from "../styles/common";

function HtmlToMarkdown() {
  const [file, setFile] = useState<File | null>(null);
  const [markdown, setMarkdown] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setMarkdown(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/html": [".html"],
    },
    multiple: false,
  });

  const handleConvert = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const htmlContent = reader.result as string;

      // Convert HTML to Markdown
      const turndownService = new TurndownService();
      const markdownContent = turndownService.turndown(htmlContent);

      setMarkdown(markdownContent);
    };
    reader.readAsText(file);
  };

  const handleDownload = () => {
    if (!markdown) return;

    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={retroStyles.container}>
      <h1 style={retroStyles.title}>HTML to Markdown Converter</h1>
      <p style={retroStyles.subtitle}>
        Convert your HTML files to Markdown format easily.
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
            Drag & drop your HTML file here, or click to select
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
            style={{
              ...retroStyles.button,
              marginTop: "2rem",
            }}
          >
            Convert to Markdown
          </button>

          {markdown && (
            <div style={{ marginTop: "2rem" }}>
              <textarea
                value={markdown}
                readOnly
                style={{
                  width: "100%",
                  height: "200px",
                  fontFamily: "monospace",
                  padding: "1rem",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f8f4f1",
                }}
              />
              <button
                onClick={handleDownload}
                style={{
                  ...retroStyles.button,
                  marginTop: "1rem",
                }}
              >
                <Download size={20} />
                Download Markdown
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HtmlToMarkdown;
