import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileImage, Download } from "lucide-react";
import { retroStyles } from "../styles/common";

function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [resizedImageUrl, setResizedImageUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(300); // Default width
  const [height, setHeight] = useState<number>(300); // Default height

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setResizedImageUrl(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".webp"],
    },
    multiple: false,
  });

  const handleResize = async () => {
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);

        // Generate the resized image as a data URL
        const resizedUrl = canvas.toDataURL("image/png");
        setResizedImageUrl(resizedUrl);
      }
    };
  };

  const handleDownload = () => {
    if (!resizedImageUrl) return;

    const a = document.createElement("a");
    a.href = resizedImageUrl;
    a.download = `resized-image.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={retroStyles.container}>
      <h1 style={retroStyles.title}>Image Resizer</h1>
      <p style={retroStyles.subtitle}>
        Resize your images to custom dimensions and download them.
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
          <FileImage size={48} style={{ margin: "0 auto", color: "#7a5230" }} />
          <p style={{ marginTop: "1rem", color: "#3e2723" }}>
            Drag & drop your image here, or click to select
          </p>
        </div>
      </div>

      {file && (
        <div style={{ marginTop: "2rem" }}>
          <div style={retroStyles.filePreview}>
            <span style={{ fontSize: "1.1rem" }}>{file.name}</span>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <label>
              Width:{" "}
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                style={{
                  marginRight: "1rem",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <label>
              Height:{" "}
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                style={{
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
          </div>

          <button
            onClick={handleResize}
            style={{
              ...retroStyles.button,
              marginTop: "2rem",
            }}
          >
            Resize Image
          </button>

          {resizedImageUrl && (
            <div style={{ marginTop: "2rem", textAlign: "center" }}>
              <img
                src={resizedImageUrl}
                alt="Resized preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  border: "1px solid #ccc",
                  marginTop: "1rem",
                  
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
                Download Resized Image
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageResizer;
