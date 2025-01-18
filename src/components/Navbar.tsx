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
        backgroundColor: '#ffffff',
        padding: '1rem 2rem',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        borderBottom: '2px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            backgroundColor: '#4F46E5',
            padding: '0.6rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          <HomeIcon size={24} color="#ffffff" />
        </div>
        {visibleNavItems.map((item) => (
          <button
            key={item.path}
            onClick={() => {
              if (location.pathname !== item.path) {
                navigate(item.path, { replace: true });
              }
            }}
            style={{
              backgroundColor: location.pathname === item.path ? '#E0E7FF' : 'transparent',
              color: location.pathname === item.path ? '#4F46E5' : '#374151',
              border: '1px solid #E5E7EB',
              padding: '0.6rem 1rem',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              boxShadow: location.pathname === item.path
                ? '0 2px 6px rgba(79, 70, 229, 0.3)'
                : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <button
          onClick={() => setShowAll((prev) => !prev)}
          style={{
            backgroundColor: '#4F46E5',
            color: '#ffffff',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'background-color 0.3s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          {showAll ? 'View Less' : 'View More'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

