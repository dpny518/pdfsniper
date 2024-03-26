import React, { useState } from 'react';
import PDFViewer from './PDFViewer';
import Highlighter from './Highlighter';
import { extractTextFromHighlights } from './OCR'; // Import OCR utility
import ExcelExporter from './ExcelExporter';

const App = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [highlights, setHighlights] = useState([]);
  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };

  const handleHighlight = (highlight) => {
    setHighlights([...highlights, highlight]);
  };

  const handleExportToExcel = async () => {
    // Extract text from highlighted sections using OCR
    const highlightedText = await extractTextFromHighlights(highlights);
    console.log('Highlighted Text:', highlightedText); // Debugging log

    // Convert highlighted text to Excel format and set Excel data state
    // Replace this with your logic to convert text to Excel format
    // For example, you can use a library like xlsx to generate Excel files
    const formattedData = highlightedText.map((text, index) => ({
      text,
      index,
    }));
    console.log('Formatted Data:', formattedData); // Debugging log
    setExcelData(formattedData);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {pdfFile && (
        <>
          <PDFViewer file={pdfFile} />
          <Highlighter pdfFile={pdfFile} onHighlight={handleHighlight} />
          <button onClick={handleExportToExcel}>Export to Excel</button>
        </>
      )}
      {excelData.length > 0 && <ExcelExporter data={excelData} />}
    </div>
  );
};

export default App;
