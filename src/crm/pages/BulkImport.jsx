import React, { useState } from 'react';
import { Upload, Download } from 'lucide-react';

const BulkImport = () => {
  const [csvData, setCsvData] = useState([]);
  const [mapping, setMapping] = useState({});

  const handleCSV = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split('\n').map(row => row.split(','));
      setCsvData(rows);
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Bulk Import (CSV)</h1>
      <input type="file" accept=".csv" onChange={handleCSV} className="mb-6 p-4 border-2 rounded-xl w-full" />
      {csvData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-100">
                {csvData[0].map((header, i) => (
                  <th key={i} className="border p-3">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.slice(1, 6).map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border p-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button className="mt-6 bg-green-600 text-white py-3 px-8 rounded-xl font-bold">Import {csvData.length - 1} Leads</button>
        </div>
      )}
    </div>
  );
};

export default BulkImport;
