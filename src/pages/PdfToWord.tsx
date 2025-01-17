import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileType, Download } from 'lucide-react';
import { retroStyles } from '../styles/common';

function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setConverted(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  });

  const handleConvert = async () => {
    setConverting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setConverting(false);
    setConverted(true);
  };

  return (
    <div style={retroStyles.container}>
      <h1 style={retroStyles.title}>PDF to Word Converter</h1>
      <p style={retroStyles.subtitle}>
        Transform your PDF documents into editable Word files with our retro-styled converter
      </p>

      <div
        {...getRootProps()}
        style={{
          ...retroStyles.dropZone,
          backgroundColor: isDragActive ? '#e6d5c7' : '#f8f4f1',
          transform: isDragActive ? 'scale(1.02)' : 'scale(1)'
        }}
      >
        <input {...getInputProps()} />
        <div style={{ textAlign: 'center' }}>
          <FileType size={48} style={{ margin: '0 auto', color: '#7a5230' }} />
          <p style={{ marginTop: '1rem', color: '#3e2723' }}>
            Drag & drop your PDF file here, or click to select
          </p>
        </div>
      </div>

      {file && (
        <div style={{ marginTop: '2rem' }}>
          <div style={retroStyles.filePreview}>
            <span style={{ fontSize: '1.1rem' }}>{file.name}</span>
          </div>

          <button
            onClick={handleConvert}
            disabled={converting || converted}
            style={{
              ...retroStyles.button,
              marginTop: '2rem',
              opacity: converting || converted ? 0.7 : 1
            }}
          >
            {converting ? 'Converting...' : converted ? 'Converted!' : 'Convert to Word'}
          </button>

          {converted && (
            <div style={{ marginTop: '2rem' }}>
              <button style={retroStyles.button}>
                <Download size={20} />
                Download DOCX
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PdfToWord;