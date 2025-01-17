import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { jsPDF } from 'jspdf';
import { Image, Trash2, Download } from 'lucide-react';
import { retroStyles } from '../styles/common';

function JpgToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setConverted(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    multiple: true,
  });

  const handleConvert = async () => {
    setConverting(true);

    // Create a new PDF document
    const pdf = new jsPDF();

    // Load each image and add it to the PDF
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Convert the file to a base64 image
      const imageBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      // Add the image to the PDF
      if (i > 0) pdf.addPage();
      pdf.addImage(imageBase64, 'JPEG', 10, 10, 190, 0); // Adjust dimensions as needed
    }

    // Save the PDF file
    pdf.save('converted.pdf');

    setConverting(false);
    setConverted(true);
  };

  return (
    <div style={retroStyles.container}>
      <h1 style={retroStyles.title}>JPG to PDF Converter</h1>
      <p style={retroStyles.subtitle}>
        Transform your JPG images into professional PDF documents with our retro-styled converter
      </p>

      <div
        {...getRootProps()}
        style={{
          ...retroStyles.dropZone,
          backgroundColor: isDragActive ? '#e6d5c7' : '#f8f4f1',
          transform: isDragActive ? 'scale(1.02)' : 'scale(1)',
        }}
      >
        <input {...getInputProps()} />
        <div style={{ textAlign: 'center' }}>
          <Image size={48} style={{ margin: '0 auto', color: '#7a5230' }} />
          <p style={{ marginTop: '1rem', color: '#3e2723' }}>
            Drag & drop JPG files here, or click to select
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {files.map((file, index) => (
              <div key={index} style={retroStyles.filePreview}>
                <span style={{ fontSize: '1.1rem' }}>{file.name}</span>
                <button
                  onClick={() => setFiles(files.filter((_, i) => i !== index))}
                  style={{
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.5rem',
                    cursor: 'pointer',
                  }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleConvert}
            disabled={converting || converted}
            style={{
              ...retroStyles.button,
              marginTop: '2rem',
              opacity: converting || converted ? 0.7 : 1,
            }}
          >
            {converting ? 'Converting...' : converted ? 'Converted!' : 'Convert to PDF'}
          </button>
        </div>
      )}
    </div>
  );
}

export default JpgToPdf;
