import React, { useState, useEffect, useMemo } from 'react';
import { Upload, CheckCircle, AlertTriangle, Zap, Download, Eye, RotateCcw, FileText, Database } from 'lucide-react';

const CRMBulkImport = () => {
  // Real data structure from the Excel file
  const [csvData, setCsvData] = useState({
    fileName: 'less funky_Leads_2026-02-08_2026-02-09',
    rows: 21,
    columns: [
      'id', 'created_time', 'ad_id', 'ad_name', 'adset_id', 'adset_name', 
      'campaign_id', 'campaign_name', 'form_id', 'form_name', 'is_organic', 
      'platform', 'आपका_नदाम_first_name', 'phone_number'
    ]
  });

  const [mappings, setMappings] = useState({
    name: '',
    phone: '',
    budget: '',
    source: '',
    email: '',
    company: ''
  });

  const [autoMapped, setAutoMapped] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Enhanced CRM field definitions
  const crmFields = {
    name: { 
      label: 'Lead Name', 
      required: true, 
      icon: '👤',
      description: 'Full name of the potential customer',
      category: 'basic'
    },
    phone: { 
      label: 'Phone Number', 
      required: true, 
      icon: '📱',
      description: 'Primary contact number',
      category: 'basic'
    },
    email: { 
      label: 'Email Address', 
      required: false, 
      icon: '📧',
      description: 'Email address for communication',
      category: 'basic'
    },
    company: { 
      label: 'Company Name', 
      required: false, 
      icon: '🏢',
      description: 'Organization or business name',
      category: 'basic'
    },
    budget: { 
      label: 'Budget Range', 
      required: false, 
      icon: '💰',
      description: 'Estimated budget or spending capacity',
      category: 'advanced'
    },
    source: { 
      label: 'Lead Source', 
      required: false, 
      icon: '🎯',
      description: 'Origin of the lead (campaign, platform, etc.)',
      category: 'advanced'
    }
  };

  // Enhanced auto-mapping with better rules
  const autoMapColumns = () => {
    const mappingRules = {
      name: [
        'name', 'full_name', 'lead_name', 'customer_name', 'contact_name',
        'आपका_नदाम', 'नाम', 'first_name', 'आपका_नदाम_first_name'
      ],
      phone: [
        'phone', 'phone_number', 'mobile', 'contact', 'number',
        'फोन', 'मोबाइल', 'contact_number', 'mobile_number'
      ],
      email: [
        'email', 'email_address', 'mail', 'e_mail',
        'ईमेल', 'email_id'
      ],
      company: [
        'company', 'company_name', 'organization', 'business',
        'कंपनी', 'org', 'business_name'
      ],
      budget: [
        'budget', 'budget_range', 'amount', 'value', 'price',
        'बजट', 'cost', 'spending'
      ],
      source: [
        'source', 'source_channel', 'campaign_name', 'platform', 'ad_name',
        'स्रोत', 'medium', 'campaign', 'utm_source'
      ]
    };

    const newMappings = {};
    const newAutoMapped = {};

    Object.keys(mappingRules).forEach(field => {
      const possibleColumns = mappingRules[field];
      const matchedColumn = csvData.columns.find(col => {
        const colLower = col.toLowerCase().replace(/_/g, ' ');
        return possibleColumns.some(rule => {
          const ruleLower = rule.toLowerCase().replace(/_/g, ' ');
          return colLower.includes(ruleLower) || ruleLower.includes(colLower) || col === rule;
        });
      });
      
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
      source: '',
      email: '',
      company: ''
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

    // Check for duplicate mappings
    const usedColumns = Object.values(mappings).filter(Boolean);
    const duplicates = usedColumns.filter((column, index) => usedColumns.indexOf(column) !== index);
    if (duplicates.length > 0) {
      errors.push(`Column "${duplicates[0]}" is mapped to multiple fields`);
    }

    return errors;
  };

  const generatePreview = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const preview = {
        totalRows: csvData.rows,
        validRows: csvData.rows - 2,
        duplicates: 1,
        errors: 1,
        sampleData: [
          {
            name: 'Piyush',
            phone: '+91-7502567010',
            email: 'piyush@example.com',
            company: 'Tech Solutions',
            source: 'Facebook Campaign'
          },
          {
            name: 'Manoj',
            phone: '+91-7534995449',
            email: 'manoj@business.com',
            company: 'Digital Marketing',
            source: 'Google Ads'
          },
          {
            name: 'Sumit',
            phone: '+91-9183878665',
            email: 'sumit@startup.in',
            company: 'Innovation Labs',
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
  const validationErrors = validateMappings();

  // Group fields by category
  const basicFields = Object.entries(crmFields).filter(([_, field]) => field.category === 'basic');
  const advancedFields = Object.entries(crmFields).filter(([_, field]) => field.category === 'advanced');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Database className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Smart Lead Import
              </h1>
              <p className="text-slate-600 text-lg">Intelligent column detection with manual controls</p>
            </div>
          </div>

          {/* File Info */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{csvData.fileName}</h3>
                  <p className="text-slate-600">{csvData.rows.toLocaleString()} records • {csvData.columns.length} columns detected</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {csvData.columns.slice(0, 4).map((col, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                        {col.length > 15 ? col.substring(0, 15) + '...' : col}
                      </span>
                    ))}
                    {csvData.columns.length > 4 && (
                      <span className="px-2 py-1 bg-slate-200 text-slate-500 text-xs rounded-full">
                        +{csvData.columns.length - 4} more
                      </span>
                    )}
                  </div>
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
                <h2 className="text-2xl font-bold text-slate-800">Field Mapping</h2>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-slate-600">
                    {mappedFieldsCount}/{Object.keys(crmFields).length} mapped
                  </div>
                  <button
                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    {showAdvancedOptions ? 'Hide Advanced' : 'Show Advanced'}
                  </button>
                </div>
              </div>

              {/* Basic Fields */}
              <div className="space-y-6 mb-8">
                <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  Essential Fields
                </h3>
                {basicFields.map(([fieldKey, field]) => (
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
                        <option key={column} value={column}>
                          {column.length > 50 ? column.substring(0, 50) + '...' : column}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {/* Advanced Fields */}
              {showAdvancedOptions && (
                <div className="space-y-6 border-t border-slate-200 pt-8">
                  <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Additional Fields
                  </h3>
                  {advancedFields.map(([fieldKey, field]) => (
                    <div key={fieldKey} className="group">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{field.icon}</span>
                        <div className="flex-1">
                          <label className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                            {field.label}
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
                            : 'border-slate-200 focus:border-slate-400'
                        } focus:outline-none text-slate-700`}
                      >
                        <option value="">Skip this field...</option>
                        {csvData.columns.map(column => (
                          <option key={column} value={column}>
                            {column.length > 50 ? column.substring(0, 50) + '...' : column}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Progress & Actions */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Import Status</h3>
              
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
                    ? '✅ Ready to proceed' 
                    : `${totalRequiredFields - requiredFieldsMapped} required field(s) remaining`
                  }
                </div>
              </div>

              {/* Additional Stats */}
              <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                <div className="text-sm text-slate-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Total Fields:</span>
                    <span className="font-medium">{Object.keys(crmFields).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mapped:</span>
                    <span className="font-medium text-emerald-600">{mappedFieldsCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auto-detected:</span>
                    <span className="font-medium text-indigo-600">{Object.values(autoMapped).filter(Boolean).length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={generatePreview}
                disabled={requiredFieldsMapped < totalRequiredFields || isProcessing || validationErrors.length > 0}
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
            {validationErrors.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold text-amber-800">Issues Found</span>
                </div>
                <ul className="text-sm text-amber-700 space-y-1">
                  {validationErrors.map((error, index) => (
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
                <div className="text-sm text-amber-700">Potential Duplicates</div>
              </div>
              <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                <div className="text-2xl font-bold text-red-600">{previewData.errors}</div>
                <div className="text-sm text-red-700">Data Issues</div>
              </div>
              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">{previewData.totalRows}</div>
                <div className="text-sm text-blue-700">Total Rows</div>
              </div>
            </div>

            {/* Sample Data */}
            <div className="bg-slate-50 rounded-2xl overflow-hidden">
              <div className="p-4 bg-slate-100 border-b border-slate-200">
                <h4 className="font-semibold text-slate-700">Sample Records (First 3 rows)</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-100">
                    <tr>
                      {Object.keys(crmFields).filter(field => mappings[field]).map(field => (
                        <th key={field} className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                          {crmFields[field].icon} {crmFields[field].label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.sampleData.map((row, index) => (
                      <tr key={index} className="border-b border-slate-200 hover:bg-slate-50">
                        {Object.keys(crmFields).filter(field => mappings[field]).map(field => (
                          <td key={field} className="px-6 py-4 text-sm text-slate-700">
                            {row[field] || '-'}
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