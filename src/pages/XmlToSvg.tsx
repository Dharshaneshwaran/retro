import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Code2, Download, Eye } from 'lucide-react';
import { retroStyles } from '../styles/common';

function XmlToSvg() {
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
      'application/xml': ['.xml'],
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
      <h1 style={retroStyles.title}>XML to SVG Converter</h1>
      <p style={retroStyles.subtitle}>
        Transform your XML files into beautiful SVG graphics with our retro-styled converter
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
          <Code2 size={48} style={{ margin: '0 auto', color: '#7a5230' }} />
          <p style={{ marginTop: '1rem', color: '#3e2723' }}>
            Drag & drop your XML file here, or click to select
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
            {converting ? 'Converting...' : converted ? 'Converted!' : 'Convert to SVG'}
          </button>

          {converted && (
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button style={retroStyles.button}>
                <Download size={20} />
                Download SVG
              </button>
              <button style={{
                ...retroStyles.button,
                backgroundColor: '#3e2723'
              }}>
                <Eye size={20} />
                Preview
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default XmlToSvg;