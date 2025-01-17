import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileImage, Download } from 'lucide-react';
import { retroStyles } from '../styles/common';

function PngToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);
  const [convertedFileURL, setConvertedFileURL] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setConverted(false);
    setConvertedFileURL(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
    },
    multiple: false,
  });

  const handleConvert = async () => {
    if (!file) return;

    setConverting(true);

    // Convert PNG to JPG
    const canvas = document.createElement('canvas');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white'; // Set a white background for JPG
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      }

      const jpgDataUrl = canvas.toDataURL('image/jpeg');
      setConvertedFileURL(jpgDataUrl);
      setConverting(false);
      setConverted(true);
    };

    img.src = URL.createObjectURL(file);
  };

  return (
    <div style={retroStyles.container}>
      <h1 style={retroStyles.title}>PNG to JPG Converter</h1>
      <p style={retroStyles.subtitle}>
        Convert your PNG images to JPG format with our retro-styled converter
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
          <FileImage size={48} style={{ margin: '0 auto', color: '#7a5230' }} />
          <p style={{ marginTop: '1rem', color: '#3e2723' }}>
            Drag & drop your PNG file here, or click to select
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
              opacity: converting || converted ? 0.7 : 1,
            }}
          >
            {converting ? 'Converting...' : converted ? 'Converted!' : 'Convert to JPG'}
          </button>

          {converted && convertedFileURL && (
            <div style={{ marginTop: '2rem' }}>
              <a
                href={convertedFileURL}
                download={file.name.replace(/\.png$/, '.jpg')}
                style={retroStyles.button}
              >
                <Download size={20} />
                Download JPG
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PngToJpg;
