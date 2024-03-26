import React from 'react';
import * as XLSX from 'xlsx';




const ExcelExporter = ({ data }) => {
  const exportToExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate a downloadable Excel file
    XLSX.writeFile(workbook, 'highlighted_data.xlsx');
  };

  return (
    <div>
      <button onClick={exportToExcel}>Export to Excel</button>
    </div>
  );
};

export default ExcelExporter;
