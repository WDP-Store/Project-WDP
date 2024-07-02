import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const exportToExcel = (title, data, sheetName, fileName) => {
  if (!data || data.length === 0) {
    console.error("Data is empty or invalid.");
    return;
  }

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Style the report title
  const reportTitleRange = XLSX.utils.decode_range(worksheet['!ref']);
  const reportTitleCell = worksheet[XLSX.utils.encode_cell({ r: 0, c: 0 })];
  if (reportTitleCell) {
    reportTitleCell.s = {
      font: { bold: true, size: 18 },
      alignment: { horizontal: "center", vertical: "center" }
    };
  }

  // Style the header row
  const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
  for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
    const headerCell = worksheet[XLSX.utils.encode_cell({ r: 1, c: C })];
    if (headerCell) {
      headerCell.s = {
        font: { bold: true, color: { rgb: "0000FF" } },
        alignment: { horizontal: "center", vertical: "center" },
      };
    }
  }

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const dataBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
  saveAs(dataBlob, fileName);
};

export default exportToExcel;