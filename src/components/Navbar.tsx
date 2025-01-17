import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon, FileText, FileImage, FileCheck, FileCode2 } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const allNavItems = [
    { name: 'Home', icon: <HomeIcon size={24} />, path: '/' },
    { name: 'PDF to PPT', icon: <FileText size={24} />, path: '/pdf-to-ppt' },
    { name: 'PDF to Excel', icon: <FileCheck size={24} />, path: '/pdf-to-excel' },
    { name: 'DOCX to PDF', icon: <FileText size={24} />, path: '/docx-to-pdf' },
    { name: 'Image Resizer', icon: <FileImage size={24} />, path: '/image-resizer' },
    { name: 'JPG to PDF', icon: <FileImage size={24} />, path: '/jpg-to-pdf' },
    { name: 'XML to SVG', icon: <FileCode2 size={24} />, path: '/xml-to-svg' },
    { name: 'PDF to Word', icon: <FileText size={24} />, path: '/pdf-to-word' },
    { name: 'TIFF to PNG', icon: <FileImage size={24} />, path: '/tiff-to-png' },
    { name: 'HTML to Markdown', icon: <FileCode2 size={24} />, path: '/html-to-markdown' },
  ];

  const [showAll, setShowAll] = useState(false);
  const visibleNavItems = showAll ? allNavItems : allNavItems.slice(0, 4);

  return (
    <nav
      style={{
        backgroundColor: '#7a5230',
        padding: '1rem',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {visibleNavItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              backgroundColor: location.pathname === item.path ? '#5a3b1d' : 'transparent',
              color: '#f4ede5',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              fontFamily: 'Courier New, monospace',
              whiteSpace: 'nowrap',
              transition: 'background-color 0.3s ease',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
            }}
          >
            {item.icon}
            {item.name}
          </button>
        ))}

        <button
          onClick={() => setShowAll((prev) => !prev)}
          style={{
            backgroundColor: '#6a4628',
            color: '#f4ede5',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontFamily: 'Courier New, monospace',
            whiteSpace: 'nowrap',
            transition: 'background-color 0.3s ease',
          }}
        >
          {showAll ? 'View Less' : 'View More'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
