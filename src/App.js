import React, { useState } from 'react';
import PDFViewer from './PDFViewer';
import Highlighter from './Highlighter';
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

  const handleExportToExcel = () => {
    // Convert highlights to Excel format and set Excel data state
    // Replace this with your logic to convert highlights to Excel format
    const formattedData = highlights.map((highlight) => ({
      // Example: Assuming highlight has text and coordinates properties
      text: highlight.text,
      x: highlight.coordinates.x,
      y: highlight.coordinates.y,
    }));
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
