import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon, FileText, FileImage, FileCheck, FileCode2 } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const allNavItems = [
    { name: 'Home', icon: <HomeIcon size={20} />, path: '/' },
    { name: 'PDF to PPT', icon: <FileText size={20} />, path: '/pdf-to-ppt' },
    { name: 'PDF to Excel', icon: <FileCheck size={20} />, path: '/pdf-to-excel' },
    { name: 'DOCX to PDF', icon: <FileText size={20} />, path: '/docx-to-pdf' },
    { name: 'Image Resizer', icon: <FileImage size={20} />, path: '/image-resizer' },
    { name: 'JPG to PDF', icon: <FileImage size={20} />, path: '/jpg-to-pdf' },
    { name: 'XML to SVG', icon: <FileCode2 size={20} />, path: '/xml-to-svg' },
    { name: 'PDF to Word', icon: <FileText size={20} />, path: '/pdf-to-word' },
    { name: 'TIFF to PNG', icon: <FileImage size={20} />, path: '/tiff-to-png' },
    { name: 'HTML to Markdown', icon: <FileCode2 size={20} />, path: '/html-to-markdown' },
  ];

  const [showAll, setShowAll] = useState(false);
  const visibleNavItems = showAll ? allNavItems : allNavItems.slice(0, 4);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md border-b border-gray-200 z-50">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* Logo Section */}
        <div
          className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-full cursor-pointer"
          onClick={() => navigate('/')}
        >
          <HomeIcon size={20} color="white" />
        </div>

        {/* Navigation Items */}
        <div className="hidden md:flex flex-wrap items-center gap-4">
          {visibleNavItems.map((item) => (
            <button
              key={item.path}
              onClick={() => location.pathname !== item.path && navigate(item.path)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-sm border
                ${location.pathname === item.path ? 'bg-indigo-100 text-indigo-600 border-indigo-300' : 'bg-white text-gray-700 border-gray-200'}`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold text-sm shadow-md hover:bg-indigo-700 md:hidden"
        >
          {showAll ? 'View Less' : 'View More'}
        </button>
      </div>

      {/* Mobile Navigation */}
      {showAll && (
        <div className="flex flex-col items-start gap-3 px-4 py-3 md:hidden">
          {allNavItems.map((item) => (
            <button
              key={item.path}
              onClick={() => location.pathname !== item.path && navigate(item.path)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-sm border w-full
                ${location.pathname === item.path ? 'bg-indigo-100 text-indigo-600 border-indigo-300' : 'bg-white text-gray-700 border-gray-200'}`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
