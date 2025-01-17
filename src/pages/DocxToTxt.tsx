import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Mammoth from "mammoth";
import { FileText, Download } from "lucide-react";
import { retroStyles } from "../styles/common";

function DocxToTxt() {
  const [file, setFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setTextContent(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        ".docx",
      ],
    },
    multiple: false,
  });

  const handleConvert = async () => {
    if (!file) return;

    setConverting(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const arrayBuffer = reader.result as ArrayBuffer;

      try {
        // Extract text content from .docx using Mammoth
        const { value } = await Mammoth.extractRawText({ arrayBuffer });
        setTextContent(value);
      } catch (error) {
        console.error("Error converting DOCX to text:", error);
        alert("Failed to convert the file. Please try again.");
      } finally {
        setConverting(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDownload = () => {
    if (!textContent) return;

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={retroStyles.container}>
      <h1 style={retroStyles.title}>DOCX to TXT Converter</h1>
      <p style={retroStyles.subtitle}>
        Convert your Word documents into plain text files.
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
            Drag & drop your DOCX file here, or click to select
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
            {converting ? "Converting..." : "Convert to TXT"}
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
              Converting your file to text, please wait...
            </p>
          )}

          {textContent && (
            <div style={{ marginTop: "2rem" }}>
              <textarea
                value={textContent}
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
                Download TXT
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DocxToTxt;
