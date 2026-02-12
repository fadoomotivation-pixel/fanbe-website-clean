import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

const BulkUpload = () => {
  const [files, setFiles] = useState([]);

  const handleUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(newFiles.map(f => ({ name: f.name, size: f.size })));
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Bulk Upload</h1>
      <input type="file" multiple onChange={handleUpload} className="mb-6 p-4 border-2 border-dashed rounded-xl w-full" />
      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((file, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl">
              <Upload className="w-6 h-6 text-indigo-600" />
              <span>{file.name} ({(file.size/1024).toFixed(1)}KB)</span>
              <X className="ml-auto cursor-pointer" onClick={() => setFiles([])} />
            </div>
          ))}
        </div>
      )}
      <button className="w-full mt-6 bg-indigo-600 text-white py-4 rounded-xl font-bold">Upload All</button>
    </div>
  );
};

export default BulkUpload;
