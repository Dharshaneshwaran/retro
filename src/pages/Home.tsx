import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileImage, FileText, FileCheck, FileCode2, Files } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  const converters = [
    { name: 'JPG to PDF', icon: <FileImage size={48} />, path: '/jpg-to-pdf' },
    { name: 'PNG to JPG', icon: <FileImage size={48} />, path: '/png-to-jpg' },
    { name: 'TXT to PDF', icon: <FileText size={48} />, path: '/txt-to-pdf' },
    { name: 'DOCX to TXT', icon: <FileText size={48} />, path: '/docx-to-txt' },
    { name: 'Image Resizer', icon: <FileImage size={48} />, path: '/image-resizer', popular: true },
    { name: 'MergePDF', icon: <Files size={48} />, path: '/MergePDF' },
    { name: 'HTML to Markdown', icon: <FileCode2 size={48} />, path: '/html-to-markdown' },
    { name: 'Markdown to PDF', icon: <FileText size={48} />, path: '/markdown-to-pdf' },
    { name: 'Split PDF', icon: <FileText size={48} />, path: '/split-pdf' },
    { name: 'compressingPDFs', icon: <FileText size={48} />, path: '/compressingPDFs' },
    { name: 'XML to SVG', icon: <FileCode2 size={48} />, path: '/xml-to-svg' },
    { name: 'PDF to Word', icon: <FileText size={48} />, path: '/pdf-to-word' },
    { name: 'PDF to PPT', icon: <FileText size={48} />, path: '/pdf-to-ppt' },
    { name: 'PDF to Excel', icon: <FileCheck size={48} />, path: '/pdf-to-excel' },
    { name: 'DOCX to PDF', icon: <FileText size={48} />, path: '/docx-to-pdf' },
    { name: 'CSV to JSON', icon: <FileCode2 size={48} />, path: '/csv-to-json' },
    { name: 'MP4 to MP3', icon: <FileImage size={48} />, path: '/mp4-to-mp3', popular: true },
    { name: 'GIF to MP4', icon: <FileCode2 size={48} />, path: '/gif-to-mp4' },
    { name: 'PDF to Image', icon: <FileText size={48} />, path: '/pdf-to-image' },
    { name: 'JSON to XML', icon: <FileCode2 size={48} />, path: '/json-to-xml' },
    { name: 'XML to JSON', icon: <FileCode2 size={48} />, path: '/xml-to-json' },
    { name: 'TIFF to PNG', icon: <FileImage size={48} />, path: '/tiff-to-png' },
    { name: 'HEIC to JPG', icon: <FileImage size={48} />, path: '/heic-to-jpg' },
    { name: 'MP3 to WAV', icon: <FileCode2 size={48} />, path: '/mp3-to-wav' },
    { name: 'ZIP to RAR', icon: <FileText size={48} />, path: '/zip-to-rar' },
    { name: 'RAR to ZIP', icon: <FileCheck size={48} />, path: '/rar-to-zip' },
    { name: 'BMP to JPG', icon: <FileImage size={48} />, path: '/bmp-to-jpg' },
    { name: 'SVG to PNG', icon: <FileCode2 size={48} />, path: '/svg-to-png' },
    { name: 'PDFEditor', icon: <FileText size={48} />, path: '/PDFEditor' },
  ];

  return (
    <div style={{ 
      fontFamily: 'Poppins, sans-serif',
      backgroundColor: '#f9f9f9',
      color: '#333',
      padding: '2rem',
    }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          color: '#2f3b52', 
          marginBottom: '0.5rem',
        }}>
          Retro File Converter Hub
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
          Convert files in style. Fast, easy, and beautifully vintage.
        </p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem', 
        padding: '1rem',
      }}>
        {converters.map((converter) => (
          <div 
            key={converter.path}
            onClick={() => navigate(converter.path)}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              padding: '1.5rem',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer',
              position: 'relative', // Added to position "Popular" label correctly
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            {converter.popular && (
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                backgroundColor: '#f97316',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
              }}>
                Popular
              </div>
            )}
            <div style={{ marginBottom: '1rem', color: '#4a5568' }}>{converter.icon}</div>
            <div style={{ fontSize: '1rem', fontWeight: '500', color: '#2d3748' }}>{converter.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
