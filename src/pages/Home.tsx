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
      textAlign: 'center', 
      marginTop: '0', 
      fontFamily: 'Courier New, monospace',
      backgroundColor: '#f4ede5',
      color: '#3e2723',
      padding: '2.5rem',
      border: '3px solid #7a5230',
      borderRadius: '15px',
      boxShadow: '8px 8px 15px rgba(0, 0, 0, 0.2)',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        fontSize: '3.5rem', 
        marginBottom: '1.5rem', 
        textShadow: '3px 3px 4px #7a5230'
      }}>
        Retro File Converter Hub
      </h1>
      <p style={{ 
        fontSize: '1.5rem', 
        marginBottom: '2.5rem', 
        fontStyle: 'italic', 
        lineHeight: '1.6' 
      }}>
        Convert files in style. Fast, easy, and beautifully vintage.
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '2.5rem', 
        marginTop: '4rem' 
      }}>
        {converters.map((converter) => (
          <div 
            key={converter.path}
            onClick={() => navigate(converter.path)}
            style={{
              backgroundColor: '#f4ede5',
              border: '2px solid #7a5230',
              padding: '2rem',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '5px 5px 10px #7a5230',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              textAlign: 'center',
              position: 'relative'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.boxShadow = '6px 6px 12px #5a3b1d';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '5px 5px 10px #7a5230';
            }}
          >
            {converter.popular && (
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                backgroundColor: '#e63946',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                Popular
              </div>
            )}
            <div style={{ marginBottom: '1.2rem' }}>{converter.icon}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{converter.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;