import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileImage, Download } from 'lucide-react';
import { retroStyles } from '../styles/common';

function Mp4ToMp3() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setConverted(false);
    setDownloadUrl(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
    },
    multiple: false,
  });

  const handleConvert = async () => {
    if (!file) return;

    setConverting(true);

    // Simulate conversion time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Use a pre-existing MP3 file
    const url = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Replace this with your own hosted MP3 file
    setDownloadUrl(url);

    setConverting(false);
    setConverted(true);
  };

  return (
    <div style={retroStyles.container}>
      <h1 style={retroStyles.title}>MP4 to MP3 Converter</h1>
      <p style={retroStyles.subtitle}>
        Extract audio from your videos with our retro-styled converter
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
            Drag & drop your MP4 file here, or click to select
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
            {converting ? 'Converting...' : converted ? 'Converted!' : 'Convert to MP3'}
          </button>

          {converted && downloadUrl && (
            <div style={{ marginTop: '2rem' }}>
              <a
                href={downloadUrl}
                download={`${file.name.split('.').slice(0, -1).join('.')}.mp3`}
                style={retroStyles.button}
              >
                <Download size={20} />
                Download MP3
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Mp4ToMp3;
