import React, { useState } from "react";
import { pdfjs } from "react-pdf";
import { PdfLoader, PdfHighlighter, Tip } from "react-pdf-highlighter";
import { PDFDocument, rgb } from "pdf-lib";
import { retroStyles } from "../styles/common";
import { FileText } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Highlight {
  content: string;
  position: {
    boundingRect: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    rects: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
    }>;
    pageNumber: number;
  };
  id: string;
}


const PdfEditor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [pdfDocument, setPdfDocument] = useState<PDFDocument | null>(null);

  const fileInputHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const fileBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBuffer);
      setPdfDocument(pdfDoc);
    }
  };

  const addHighlight = (highlight: Highlight) => {
    setHighlights((prevHighlights) => [...prevHighlights, highlight]);
  };

  const saveAndDownloadPdf = async () => {
    if (!pdfDocument || !file) {
      alert("Please upload and edit a PDF first.");
      return;
    }

    // Add highlights/annotations to the PDF
    highlights.forEach((highlight) => {
      const page = pdfDocument.getPage(highlight.position.pageNumber - 1);
      const { x, y, width, height } = highlight.position.boundingRect;

      page.drawRectangle({
        x,
        y: page.getHeight() - y - height, // Flip Y-axis
        width,
        height,
        color: rgb(108, 108, 31), // Yellow highlight color
        opacity: 0.5,
      });
    });

    const modifiedPdfBytes = await pdfDocument.save();
    const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });

    // Download the modified PDF
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "edited.pdf";
    link.click();
  };

  return (
    <div style={retroStyles.container}>
      <h1 style={retroStyles.title}>PDF Editor</h1>
      <p style={retroStyles.subtitle}>
        Edit your PDF files with highlights and annotations.
      </p>

      {!file && (
        <div
          style={{
            ...retroStyles.dropZone,
            backgroundColor: "#f8f4f1",
            textAlign: "center",
          }}
        >
          <input
            type="file"
            accept="application/pdf"
            onChange={fileInputHandler}
            style={{ display: "none" }}
            id="pdf-input"
          />
          <label htmlFor="pdf-input" style={{ cursor: "pointer" }}>
            <FileText size={48} style={{ margin: "0 auto", color: "#7a5230" }} />
            <p style={{ marginTop: "1rem", color: "#3e2723" }}>
              Drag & drop your PDF file here, or click to select
            </p>
          </label>
        </div>
      )}

      {file && (
        <div style={{ marginTop: "2rem", width: "100%", height: "80vh" }}>
          <PdfLoader url={URL.createObjectURL(file)} beforeLoad={<div>Loading...</div>}>
            {(loadedPdfDocument) => (
              <PdfHighlighter
                pdfDocument={loadedPdfDocument}
                onScrollChange={() => {}}
                scrollRef={() => {}}
                onSelectionFinished={(position, content, hideTipAndSelection) =>
                  position && content ? (
                    <Tip
                      onOpen={() => {}}
                      onConfirm={() => {
                        addHighlight({
                          content: content.text,
                          position: {
                          comment: content.text, // Add comment property
                          id: String(Math.random()), // Unique ID
                            rects: position.rects,
                            pageNumber: position.pageNumber,
                          },
                          id: String(Math.random()), // Unique ID
                        });
                        hideTipAndSelection();
                      }}
                    />
                  ) : null
                }
                highlights={highlights}
              />
            )}
          </PdfLoader>
          <button
            onClick={saveAndDownloadPdf}
            style={{
              ...retroStyles.button,
              marginTop: "1rem",
            }}
          >
            Save and Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfEditor;
