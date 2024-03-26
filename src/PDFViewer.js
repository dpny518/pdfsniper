import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './PDFViewer.css'; // Import CSS file for styling

// Set the worker URL for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ file }) => {
  return (
    <div className="pdf-viewer">
      <Document file={file}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PDFViewer;
