import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { jsPDF } from 'jspdf';
import { Image, Trash2 } from 'lucide-react';

function JpgToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setConverted(false);
    setPdfUrl(null);
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

    const pdf = new jsPDF();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const imageBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      if (i > 0) pdf.addPage();
      pdf.addImage(imageBase64, 'JPEG', 10, 10, 190, 0);
    }

    const blob = pdf.output('blob');
    const url = URL.createObjectURL(blob);

    setPdfUrl(url);
    setConverting(false);
    setConverted(true);
  };

  return (
    <div style={{
      textAlign: 'center',
      marginTop: '0',
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#fafafa',
      padding: '4rem',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <h1 style={{
        fontSize: '4rem',
        fontWeight: 'bold',
        background: 'linear-gradient(90deg, #4caf50, #f44336)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        marginBottom: '1rem',
      }}>
        JPG to PDF Converter
      </h1>
      <p style={{
        fontSize: '1.2rem',
        color: '#666',
        marginBottom: '2rem',
      }}>
        Transform your JPG images into professional PDF documents with our retro-styled converter
      </p>

      <div
        {...getRootProps()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed #7a5230',
          backgroundColor: isDragActive ? '#e6d5c7' : '#f8f4f1',
          padding: '2rem',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, background-color 0.2s ease',
          transform: isDragActive ? 'scale(1.02)' : 'scale(1)',
          width: '100%',
          maxWidth: '600px',
          marginBottom: '2rem',
        }}
      >
        <input {...getInputProps()} />
        <Image size={48} style={{ margin: '0 auto', color: '#7a5230' }} />
        <p style={{ marginTop: '1rem', color: '#3e2723', fontSize: '1.2rem' }}>
          Drag & drop JPG files here, or click to select
        </p>
      </div>

      {files.length > 0 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '600px',
        }}>
          <div style={{
            display: 'grid',
            gap: '1rem',
            width: '100%',
          }}>
            {files.map((file, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#fff',
                border: '1px solid #ddd',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}>
                <span style={{ fontSize: '1rem', color: '#3e2723' }}>{file.name}</span>
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
              marginTop: '2rem',
              padding: '0.8rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #4caf50, #f44336)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
              opacity: converting || converted ? 0.7 : 1,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'linear-gradient(90deg, #388e3c, #d32f2f)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'linear-gradient(90deg, #4caf50, #f44336)';
            }}
          >
            {converting ? 'Converting...' : converted ? 'Converted!' : 'Convert to PDF'}
          </button>

          {pdfUrl && (
            <a
              href={pdfUrl}
              download="converted.pdf"
              style={{
                marginTop: '1rem',
                padding: '0.8rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #4caf50, #f44336)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              Download PDF
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default JpgToPdf;
