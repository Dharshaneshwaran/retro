import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { getDocument } from 'pdfjs-dist';
import { retroStyles } from '../styles/common';

function PdfToExcel() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  });

  const handleConvert = async () => {
    if (!file) return;

    setConverting(true);
    setError(null);

    try {
      // Load the PDF file
      const fileData = await file.arrayBuffer();
      const pdf = await getDocument({ data: fileData }).promise;

      const extractedData: string[][] = [];

      // Extract text from each page
      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const textContent = await page.getTextContent();

        // Extract the text in a readable format
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        extractedData.push([`Page ${i + 1}`, pageText]);
      }

      if (extractedData.length === 0) {
        setError('No text found in the PDF.');
        setConverting(false);
        return;
      }

      // Generate Excel file
      const worksheet = XLSX.utils.aoa_to_sheet(extractedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelData], { type: 'application/octet-stream' });

      // Download the file
      saveAs(blob, 'converted.xlsx');
    } catch (err) {
      console.error('Error converting PDF:', err);
      setError('Failed to process the file. Please try again.');
    } finally {
      setConverting(false);
    }
  };

  return (
    <div style={retroStyles.container}>
      <h1 style={retroStyles.title}>PDF to Excel Converter</h1>
      <p style={retroStyles.subtitle}>
        Transform your PDF text into spreadsheets with our retro-styled converter
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
          <FileSpreadsheet size={48} style={{ margin: '0 auto', color: '#7a5230' }} />
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
            disabled={converting}
            style={{
              ...retroStyles.button,
              marginTop: '2rem',
              opacity: converting ? 0.7 : 1,
            }}
          >
            {converting ? 'Converting...' : 'Convert to Excel'}
          </button>

          {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
        </div>
      )}
    </div>
  );
}

export default PdfToExcel;
