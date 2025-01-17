import { useState } from "react";
import { useDropzone } from "react-dropzone";
import  compress  from "pdf-compressor";
import { FileText, Download } from "lucide-react";
import { retroStyles } from "../styles/common";

function HighCompressPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [compressedPdfUrl, setCompressedPdfUrl] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setCompressedPdfUrl(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const handleCompress = async () => {
    if (!file) {
      alert("Please upload a PDF file to compress.");
      return;
    }

    setCompressing(true);

    try {
      const compressedBytes = await compress(file, {
        quality: 75, // Reduce image quality to 75%
      });

      const blob = new Blob([compressedBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setCompressedPdfUrl(url);
    } catch (error) {
      console.error("Error compressing PDF:", error);
      alert("An error occurred while compressing the PDF. Please try again.");
    } finally {
      setCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedPdfUrl) return;

    const a = document.createElement("a");
    a.href = compressedPdfUrl;
    a.download = "compressed.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={retroStyles.container}>
      <h1 style={retroStyles.title}>High Compression PDF</h1>
      <p style={retroStyles.subtitle}>
        Upload a PDF file to compress it with high efficiency.
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
            onClick={handleCompress}
            disabled={compressing}
            style={{
              ...retroStyles.button,
              marginTop: "2rem",
              opacity: compressing ? 0.7 : 1,
            }}
          >
            {compressing ? "Compressing..." : "Compress PDF"}
          </button>

          {compressing && (
            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.9rem",
                color: "#7a5230",
                fontStyle: "italic",
              }}
            >
              Compressing your PDF, please wait...
            </p>
          )}

          {compressedPdfUrl && (
            <div style={{ marginTop: "2rem" }}>
              <button
                onClick={handleDownload}
                style={{
                  ...retroStyles.button,
                  marginTop: "1rem",
                }}
              >
                <Download size={20} />
                Download Compressed PDF
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HighCompressPDF;
