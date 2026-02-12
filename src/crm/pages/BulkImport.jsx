import React, { useState, useEffect, useMemo } from 'react';
import { Upload, CheckCircle, AlertTriangle, Zap, Download, Eye, RotateCcw } from 'lucide-react';

const CRMBulkImport = () => {
  const [csvData, setCsvData] = useState({
    fileName: 'New Leads ad_Leads_2026-02-07_2026-02-08.csv',
    rows: 48,
    columns: ['id', 'created_time', 'ad_id', 'ad_name', 'adset_id', 'adset_name', 'campaign_id', 'campaign_name', 'form_id', 'form_name', 'is_organic', 'platform', 'आपका_नाम', 'phone_number', 'budget_range', 'source_channel']
  });

  const [mappings, setMappings] = useState({
    name: '',
    phone: '',
    budget: '',
    source: ''
  });

  const [autoMapped, setAutoMapped] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  // CRM field definitions with validation rules
  const crmFields = {
    name: { 
      label: 'Lead Name', 
      required: true, 
      icon: '👤',
      description: 'Full name of the potential customer'
    },
    phone: { 
      label: 'Phone Number', 
      required: true, 
      icon: '📱',
      description: 'Primary contact number'
    },
    budget: { 
      label: 'Budget Range', 
      required: false, 
      icon: '💰',
      description: 'Estimated budget or spending capacity'
    },
    source: { 
      label: 'Lead Source', 
      required: false, 
      icon: '🎯',
      description: 'Origin of the lead (campaign, platform, etc.)'
    }
  };

  // Smart auto-mapping logic
  const autoMapColumns = () => {
    const mappingRules = {
      name: ['name', 'full_name', 'lead_name', 'customer_name', 'आपका_नाम', 'नाम'],
      phone: ['phone', 'phone_number', 'mobile', 'contact', 'फोन'],
      budget: ['budget', 'budget_range', 'amount', 'value', 'बजट'],
      source: ['source', 'source_channel', 'campaign_name', 'platform', 'ad_name', 'स्रोत']
    };

    const newMappings = {};
    const newAutoMapped = {};

    Object.keys(mappingRules).forEach(field => {
      const possibleColumns = mappingRules[field];
      const matchedColumn = csvData.columns.find(col => 
        possibleColumns.some(rule => 
          col.toLowerCase().includes(rule.toLowerCase()) ||
          rule.toLowerCase().includes(col.toLowerCase())
        )
      );
      
      if (matchedColumn) {
        newMappings[field] = matchedColumn;
        newAutoMapped[field] = true;
      }
    });

    setMappings(newMappings);
    setAutoMapped(newAutoMapped);
  };

  // Initialize auto-mapping on component mount
  useEffect(() => {
    autoMapColumns();
  }, [csvData.columns]);

  const handleMappingChange = (field, column) => {
    setMappings(prev => ({ ...prev, [field]: column }));
    setAutoMapped(prev => ({ ...prev, [field]: false }));
  };

  const resetMappings = () => {
    setMappings({
      name: '',
      phone: '',
      budget: '',
      source: ''
    });
    setAutoMapped({});
  };

  const validateMappings = () => {
    const errors = [];
    Object.keys(crmFields).forEach(field => {
      if (crmFields[field].required && !mappings[field]) {
        errors.push(`${crmFields[field].label} is required`);
      }
    });
    return errors;
  };

  const generatePreview = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const preview = {
        totalRows: csvData.rows,
        validRows: csvData.rows - 3,
        duplicates: 2,
        errors: 1,
        sampleData: [
          {
            name: 'Rajesh Kumar',
            phone: '+91-9876543210',
            budget: '₹50,000-₹1,00,000',
            source: 'Facebook Campaign'
          },
          {
            name: 'Priya Singh',
            phone: '+91-8765432109',
            budget: '₹25,000-₹50,000',
            source: 'Google Ads'
          },
          {
            name: 'Amit Patel',
            phone: '+91-7654321098',
            budget: '₹1,00,000+',
            source: 'Instagram Campaign'
          }
        ]
      };
      setPreviewData(preview);
      setIsProcessing(false);
    }, 1500);
  };

  const mappedFieldsCount = Object.values(mappings).filter(Boolean).length;
  const requiredFieldsMapped = Object.keys(crmFields).filter(field => 
    crmFields[field].required && mappings[field]
  ).length;
  const totalRequiredFields = Object.keys(crmFields).filter(field => crmFields[field].required).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Bulk Lead Import
              </h1>
              <p className="text-slate-600 text-lg">Intelligent mapping with manual override controls</p>
            </div>
          </div>

          {/* File Info */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{csvData.fileName}</h3>
                  <p className="text-slate-600">{csvData.rows.toLocaleString()} rows • {csvData.columns.length} columns</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={autoMapColumns}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
                >
                  <Zap className="w-4 h-4" />
                  Auto Map
                </button>
                <button 
                  onClick={resetMappings}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all duration-200 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mapping Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Column Mapping</h2>
                <div className="text-sm text-slate-600">
                  {mappedFieldsCount}/{Object.keys(crmFields).length} fields mapped
                </div>
              </div>

              <div className="space-y-6">
                {Object.entries(crmFields).map(([fieldKey, field]) => (
                  <div key={fieldKey} className="group">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{field.icon}</span>
                      <div className="flex-1">
                        <label className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                          {field.label}
                          {field.required && <span className="text-red-500 text-xs">*</span>}
                          {autoMapped[fieldKey] && (
                            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              Auto
                            </span>
                          )}
                        </label>
                        <p className="text-xs text-slate-500 mt-1">{field.description}</p>
                      </div>
                    </div>

                    <select
                      value={mappings[fieldKey]}
                      onChange={(e) => handleMappingChange(fieldKey, e.target.value)}
                      className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                        mappings[fieldKey]
                          ? autoMapped[fieldKey]
                            ? 'border-indigo-200 bg-indigo-50/50 focus:border-indigo-400'
                            : 'border-emerald-200 bg-emerald-50/50 focus:border-emerald-400'
                          : field.required
                          ? 'border-red-200 focus:border-red-400'
                          : 'border-slate-200 focus:border-slate-400'
                      } focus:outline-none text-slate-700`}
                    >
                      <option value="">Select a column...</option>
                      {csvData.columns.map(column => (
                        <option key={column} value={column}>{column}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress & Actions */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Import Progress</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Required Fields</span>
                  <span className={`font-semibold ${requiredFieldsMapped === totalRequiredFields ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {requiredFieldsMapped}/{totalRequiredFields}
                  </span>
                </div>
                
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      requiredFieldsMapped === totalRequiredFields 
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' 
                        : 'bg-gradient-to-r from-amber-500 to-amber-600'
                    }`}
                    style={{ width: `${(requiredFieldsMapped / totalRequiredFields) * 100}%` }}
                  />
                </div>

                <div className="text-xs text-slate-500">
                  {requiredFieldsMapped === totalRequiredFields 
                    ? '✅ Ready to import' 
                    : `${totalRequiredFields - requiredFieldsMapped} required field(s) remaining`
                  }
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={generatePreview}
                disabled={requiredFieldsMapped < totalRequiredFields || isProcessing}
                className="w-full p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Generate Preview
                  </>
                )}
              </button>

              <button
                disabled={!previewData}
                className="w-full p-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                Import {csvData.rows} Leads
              </button>
            </div>

            {/* Validation Warnings */}
            {validateMappings().length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold text-amber-800">Mapping Issues</span>
                </div>
                <ul className="text-sm text-amber-700 space-y-1">
                  {validateMappings().map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Preview Section */}
        {previewData && (
          <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Import Preview</h3>
            
            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                <div className="text-2xl font-bold text-emerald-600">{previewData.validRows}</div>
                <div className="text-sm text-emerald-700">Valid Records</div>
              </div>
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                <div className="text-2xl font-bold text-amber-600">{previewData.duplicates}</div>
                <div className="text-sm text-amber-700">Duplicates</div>
              </div>
              <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                <div className="text-2xl font-bold text-red-600">{previewData.errors}</div>
                <div className="text-sm text-red-700">Errors</div>
              </div>
              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">{previewData.totalRows}</div>
                <div className="text-sm text-blue-700">Total Rows</div>
              </div>
            </div>

            {/* Sample Data */}
            <div className="bg-slate-50 rounded-2xl overflow-hidden">
              <div className="p-4 bg-slate-100 border-b border-slate-200">
                <h4 className="font-semibold text-slate-700">Sample Data Preview</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-100">
                    <tr>
                      {Object.keys(crmFields).filter(field => mappings[field]).map(field => (
                        <th key={field} className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                          {crmFields[field].label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.sampleData.map((row, index) => (
                      <tr key={index} className="border-b border-slate-200 hover:bg-slate-50">
                        {Object.keys(crmFields).filter(field => mappings[field]).map(field => (
                          <td key={field} className="px-6 py-4 text-sm text-slate-700">
                            {row[field]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CRMBulkImport;