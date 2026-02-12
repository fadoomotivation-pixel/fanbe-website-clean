import React, { useState, useRef } from 'react';
import { Upload, X, File, Image, FileText, Check, AlertCircle, Download, Eye } from 'lucide-react';

const BulkUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadType, setUploadType] = useState('images'); // 'images', 'documents', 'employee-data'
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  // File type configurations
  const uploadConfig = {
    images: {
      accept: 'image/*',
      maxSize: 10 * 1024 * 1024, // 10MB
      multiple: true,
      description: 'Property images, gallery photos'
    },
    documents: {
      accept: '.pdf,.doc,.docx,.xlsx,.xls',
      maxSize: 25 * 1024 * 1024, // 25MB
      multiple: true,
      description: 'RERA certificates, agreements, NOCs'
    },
    'employee-data': {
      accept: '.csv,.xlsx,.xls',
      maxSize: 5 * 1024 * 1024, // 5MB
      multiple: false,
      description: 'Employee/lead bulk import spreadsheet'
    }
  };

  const config = uploadConfig[uploadType];

  // Handle file selection
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    processFiles(selectedFiles);
  };

  // Process and validate files
  const processFiles = (selectedFiles) => {
    const validFiles = selectedFiles.filter(file => {
      // Size validation
      if (file.size > config.maxSize) {
        alert(`${file.name} exceeds max size of ${config.maxSize / (1024 * 1024)}MB`);
        return false;
      }
      
      // Type validation
      const fileExt = '.' + file.name.split('.').pop().toLowerCase();
      if (uploadType === 'images' && !file.type.startsWith('image/')) {
        alert(`${file.name} is not a valid image`);
        return false;
      }
      
      return true;
    });

    const newFiles = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      status: 'pending', // pending, uploading, completed, error
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  // Remove file
  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  // Simulate upload (replace with actual API call)
  const uploadFiles = async () => {
    setUploading(true);

    for (let fileObj of files) {
      if (fileObj.status === 'completed') continue;

      // Update status to uploading
      setFiles(prev => prev.map(f => 
        f.id === fileObj.id ? { ...f, status: 'uploading' } : f
      ));

      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setFiles(prev => prev.map(f => 
          f.id === fileObj.id ? { ...f, progress } : f
        ));
      }

      // Upload logic based on type
      try {
        if (uploadType === 'images') {
          // Upload to image storage (Cloudinary/S3)
          await uploadImage(fileObj.file);
        } else if (uploadType === 'documents') {
          // Upload to document storage
          await uploadDocument(fileObj.file);
        } else if (uploadType === 'employee-data') {
          // Parse CSV/Excel and bulk import
          await parseAndImportData(fileObj.file);
        }

        setFiles(prev => prev.map(f => 
          f.id === fileObj.id ? { ...f, status: 'completed' } : f
        ));
      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === fileObj.id ? { ...f, status: 'error' } : f
        ));
      }
    }

    setUploading(false);
  };

  // API functions (implement your backend logic)
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    // await fetch('/api/upload/image', { method: 'POST', body: formData });
    return new Promise(resolve => setTimeout(resolve, 500));
  };

  const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append('document', file);
    // await fetch('/api/upload/document', { method: 'POST', body: formData });
    return new Promise(resolve => setTimeout(resolve, 500));
  };

  const parseAndImportData = async (file) => {
    // Use library like 'xlsx' or 'papaparse'
    // Parse CSV/Excel → validate → bulk insert to database
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) return <Image className="w-5 h-5 text-blue-500" />;
    if (file.type.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
    return <File className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bulk Upload</h1>
          <p className="text-gray-600">Upload multiple files at once with preview</p>
        </div>

        {/* Upload Type Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Upload Type</label>
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(uploadConfig).map(type => (
              <button
                key={type}
                onClick={() => setUploadType(type)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  uploadType === type
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                <div className="font-semibold capitalize mb-1">
                  {type.replace('-', ' ')}
                </div>
                <div className="text-xs text-gray-500">{uploadConfig[type].description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`bg-white rounded-xl shadow-lg p-12 mb-6 border-2 border-dashed transition-all cursor-pointer ${
            isDragging
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-300 hover:border-indigo-400'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={config.accept}
            multiple={config.multiple}
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="text-center">
            <Upload className={`w-16 h-16 mx-auto mb-4 ${isDragging ? 'text-indigo-600' : 'text-gray-400'}`} />
            <p className="text-xl font-semibold text-gray-700 mb-2">
              Drag & drop files here
            </p>
            <p className="text-gray-500 mb-4">or click to browse</p>
            <p className="text-sm text-gray-400">
              Max size: {config.maxSize / (1024 * 1024)}MB | 
              Format: {config.accept} | 
              {config.multiple ? ' Multiple files allowed' : ' Single file only'}
            </p>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Selected Files ({files.length})
              </h3>
              <button
                onClick={() => setFiles([])}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-3">
              {files.map(fileObj => (
                <div
                  key={fileObj.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  {/* Preview/Icon */}
                  <div className="w-16 h-16 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-200">
                    {fileObj.preview ? (
                      <img src={fileObj.preview} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {getFileIcon(fileObj)}
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{fileObj.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(fileObj.size)}</p>
                    
                    {/* Progress Bar */}
                    {fileObj.status === 'uploading' && (
                      <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full transition-all duration-300"
                          style={{ width: `${fileObj.progress}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    {fileObj.status === 'completed' && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                    {fileObj.status === 'error' && (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                    {fileObj.status === 'pending' && (
                      <button
                        onClick={() => removeFile(fileObj.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        {files.length > 0 && (
          <button
            onClick={uploadFiles}
            disabled={uploading || files.every(f => f.status === 'completed')}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {uploading ? 'Uploading...' : 'Upload All Files'}
          </button>
        )}
      </div>
    </div>
  );
};

export default BulkUpload;
