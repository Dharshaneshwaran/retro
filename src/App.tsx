
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JpgToPdf from './pages/JpgToPdf';
import XmlToSvg from './pages/XmlToSvg';
import PdfToWord from './pages/PdfToWord';
import PdfToPpt from './pages/PdfToPpt';
import PdfToExcel from './pages/PdfToExcel';
import DocxToPdf from './pages/DocxToPdf';
import CsvToJson from './pages/CsvToJson';
import Mp4ToMp3 from './pages/Mp4ToMp3';
import PngToJpg from './pages/PngToJpg';
import GifToMp4 from './pages/GifToMp4';
import PdfToImage from './pages/PdfToImage';
import HtmlToMarkdown from './pages/HtmlToMarkdown';
import MarkdownToPdf from './pages/MarkdownToPdf';
import TxtToPdf from './pages/TxtToPdf';
import JsonToXml from './pages/JsonToXml';
import XmlToJson from './pages/XmlToJson';
import TiffToPng from './pages/TiffToPng';
import DocxToTxt from './pages/DocxToTxt';
import HeicToJpg from './pages/HeicToJpg';
import Mp3ToWav from './pages/Mp3ToWav';
import ZipToRar from './pages/ZipToRar';
import RarToZip from './pages/RarToZip';
import BmpToJpg from './pages/BmpToJpg';
import SvgToPng from './pages/SvgToPng';
import ImageResizer from './pages/ImageResizer';
import MergePDF from './pages/MergePDF';
import SplitPDF from './pages/SplitPDF';
import CompressingPDFs from './pages/compressingPDFs';
import PDFEditor from './pages/PDFEditor';


function App() {
  return (
    <Router>
      <div style={{ 
        backgroundColor: '#f4ede5',
        minHeight: '100vh',
        paddingTop: '64px'
      }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
          <Route path="/xml-to-svg" element={<XmlToSvg />} />
          <Route path="/pdf-to-word" element={<PdfToWord />} />
          <Route path="/pdf-to-ppt" element={<PdfToPpt />} />
          <Route path="/pdf-to-excel" element={<PdfToExcel />} />
          <Route path="/docx-to-pdf" element={<DocxToPdf />} />
          <Route path="/csv-to-json" element={<CsvToJson />} />
          <Route path="/mp4-to-mp3" element={<Mp4ToMp3 />} />
          <Route path="/png-to-jpg" element={<PngToJpg />} />
          <Route path="/Split-PDF" element={<SplitPDF />} />
          <Route path="/compressingPDFs" element={<CompressingPDFs />} />
          <Route path="/pdf-to-image" element={<PdfToImage />} />
          <Route path="/json-to-xml" element={<JsonToXml />} />
          <Route path="/xml-to-json" element={<XmlToJson />} />
          <Route path="/tiff-to-png" element={<TiffToPng />} />
          <Route path="/heic-to-jpg" element={<HeicToJpg />} />
          <Route path="/mp3-to-wav" element={<Mp3ToWav />} />
          <Route path="/rar-to-zip" element={<RarToZip />} />
          <Route path="/bmp-to-jpg" element={<BmpToJpg />} />
          <Route path="/svg-to-png" element={<SvgToPng />} />
          <Route path="/gif-to-mp4" element={<GifToMp4 />} />
          <Route path="/pdfeditor" element={<PDFEditor />} />
          <Route path="/mergepdf" element={<MergePDF />} />
           <Route path="/docx-to-txt" element={<DocxToTxt />} />
          <Route path="/txt-to-pdf" element={<TxtToPdf />} />
           <Route path="/markdown-to-pdf" element={<MarkdownToPdf />} /> 
           <Route path="/html-to-markdown" element={<HtmlToMarkdown />} />
          <Route path="/zip-to-rar" element={<ZipToRar />} />
          <Route path="/image-resizer" element={<ImageResizer />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;