# 1. Save code above to src/crm/pages/BulkUpload.jsx (VSCode/nano)
# 2. Fix LanguageContext delete (create new)
mkdir -p src/context
cat > src/context/LanguageContext.jsx << 'EOF'
import React, { createContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider


import React, { useState } from 'react';
import { Upload, X, Check } from 'lucide-react';

const BulkUpload = () => {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('idle');

  const handleUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(newFiles.map(f => ({ name: f.name, size: f.size })));
    setStatus('ready');
  };

  const uploadAll = () => {
    setStatus('uploading');
    setTimeout(() => setStatus('complete'), 2000);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Bulk Upload</h1>
      
      <input type="file" multiple onChange={handleUpload} className="mb-6 p-4 border-2 border-dashed rounded-xl" />
      
      {files.length > 0 && (
        <div className="space-y-3 mb-6">
          {files.map((file, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl">
              <Upload className="w-6 h-6 text-indigo-600" />
              <span>{file.name} ({(file.size/1024).toFixed(1)}KB)</span>
              <X className="ml-auto cursor-pointer" onClick={() => setFiles([])} />
            </div>
          ))}
        </div>
      )}
      
      <button 
        onClick={uploadAll}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold hover:shadow-xl transition"
        disabled={status === 'uploading'}
      >
        {status === 'uploading' ? <Check className="w-6 h-6 mx-auto animate-spin" /> : 'Upload All'}
      </button>
    </div>
  );
};

export default BulkUpload;
