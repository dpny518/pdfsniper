import React from 'react';
import * as XLSX from 'xlsx';

const ExcelExporter = ({ data }) => {
  const exportToExcel = () => {
    try {
      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Convert data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // Generate a downloadable Excel file
      XLSX.writeFile(workbook, 'exported_data.xlsx');
    } catch (error) {
      console.error('Error exporting data to Excel:', error);
    }
  };

  return (
    <div>
      <button onClick={exportToExcel}>Export to Excel</button>
    </div>
  );
};

export default ExcelExporter;
