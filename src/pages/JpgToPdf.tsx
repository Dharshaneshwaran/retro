import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { Image, Trash2 } from 'lucide-react';

const JpgToPdf = () => {
  interface FileWithPreview {
    file: File;
    id: string;
    preview: string;
  }
  
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files as FileList);
    const newFiles = selectedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substring(7),
      preview: URL.createObjectURL(file)
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedItem === null) return;

    const newFiles = [...files];
    const draggedFile = newFiles[draggedItem];
    newFiles.splice(draggedItem, 1);
    newFiles.splice(index, 0, draggedFile);

    setFiles(newFiles);
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      const newFiles = droppedFiles.map(file => ({
        file,
        id: Math.random().toString(36).substring(7),
        preview: URL.createObjectURL(file)
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleConvert = async () => {
    const pdf = new jsPDF();

    for (let i = 0; i < files.length; i++) {
      const file = files[i].file;
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
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          JPG to PDF Converter
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Easily combine your JPG images into a single, shareable PDF document in just a few clicks.
        </p>

        <div 
          className="mb-8 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
          <Image className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-600">Drop images here or click to browse</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {files.map((file, index) => (
            <div
              key={file.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`bg-white rounded-lg shadow overflow-hidden ${
                draggedItem === index ? 'opacity-50' : ''
              }`}
            >
              <div className="aspect-square relative">
                <img
                  src={file.preview}
                  alt={file.file.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-500 truncate">
                  {file.file.name}
                </p>
                <p className="text-xs text-gray-400">
                  {(file.file.size / 1024).toFixed(2)} KB
                </p>
                <button
                  onClick={() => removeFile(index)}
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-2 py-1 rounded text-sm hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={14} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {files.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleConvert}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Convert to PDF
            </button>
          </div>
        )}

        {pdfUrl && (
          <div className="mt-4 text-center">
            <a
              href={pdfUrl}
              download="converted.pdf"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Download PDF
            </a>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default JpgToPdf;
