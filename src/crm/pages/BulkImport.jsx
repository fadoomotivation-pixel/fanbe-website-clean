import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeads } from '../context/LeadContext';

const C = { navy: '#1a3a5c', gold: '#c9a962' };

export default function BulkImport() {
  const nav = useNavigate();
  const { addLead, allLeads, employees, PROJECTS } = useLeads();
  const fileRef = useRef();

  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [mapping, setMapping] = useState({ name: '', phone: '', budget: '', source: '' });
  const [assignTo, setAssignTo] = useState('');
  const [project, setProject] = useState(PROJECTS[0]);
  const [preview, setPreview] = useState([]);
  const [dupes, setDupes] = useState([]);
  const [result, setResult] = useState(null);

  const parseCSV = (text) => {
    const lines = text.split('\n').filter(l => l.trim());
    const h = lines[0].split(',').map(s => s.trim().replace(/"/g, ''));
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const vals = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
      const row = {};
      h.forEach((header, j) => row[header] = (vals[j] || '').replace(/"/g, '').trim());
      if (Object.values(row).some(v => v)) rows.push(row);
    }
    return { headers: h, data: rows };
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const { headers: h, data: d } = parseCSV(ev.target.result);
      setHeaders(h);
      setData(d);
      const m = { name: '', phone: '', budget: '', source: '' };
      h.forEach(header => {
        const l = header.toLowerCase();
        if (l.includes('name') || l.includes('first')) m.name = header;
        if (l.includes('phone') || l.includes('number') || l.includes('mobile')) m.phone = header;
        if (l.includes('budget') || l.includes('बजट')) m.budget = header;
        if (l.includes('platform') || l.includes('source')) m.source = header;
      });
      setMapping(m);
      setStep(2);
    };
    reader.readAsText(f);
  };

  const normalize = (p) => (p || '').toString().replace(/\D/g, '').slice(-10);

  const process = () => {
    const existing = new Set(allLeads.map(l => normalize(l.phone)));
    const seen = new Set();
    const valid = [];
    const dups = [];

    data.forEach(row => {
      const phone = normalize(row[mapping.phone]);
      if (!phone || phone.length !== 10) return;

      const lead = {
        name: row[mapping.name] || 'Unknown',
        phone,
        budget: row[mapping.budget] || '',
        source: row[mapping.source] || 'Facebook'
      };

      if (existing.has(phone)) {
        dups.push({ ...lead, reason: 'Already in CRM' });
      } else if (seen.has(phone)) {
        dups.push({ ...lead, reason: 'Duplicate in file' });
      } else {
        seen.add(phone);
        valid.push(lead);
      }
    });

    setPreview(valid);
    setDupes(dups);
    setStep(3);
  };

  const doImport = () => {
    let count = 0;
    preview.forEach(l => {
      addLead({
        name: l.name,
        phone: l.phone,
        budget: l.budget,
        source: l.source,
        project,
        plotSize: '100 sq.yd',
        score: 'Warm',
        status: 'New',
        assignedTo: assignTo ? Number(assignTo) : null,
        followUpDate: new Date().toISOString().split('T')[0]
      });
      count++;
    });
    setResult({ imported: count, skipped: dupes.length });
    setStep(4);
  };

  const inputStyle = { width: '100%', padding: 14, borderRadius: 12, border: '2px solid #e2e8f0', fontSize: 15, boxSizing: 'border-box' };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: 100 }}>
      <div style={{ background: C.navy, padding: '20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => nav(-1)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, padding: 0 }}>←</button>
          <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>📤 Bulk Import</h1>
        </div>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', padding: '16px', gap: 8 }}>
        {['Upload', 'Map', 'Review', 'Done'].map((l, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: step > i + 1 ? '#22c55e' : step === i + 1 ? C.gold : '#e2e8f0', color: step >= i + 1 ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', fontSize: 12, fontWeight: 600 }}>
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <div style={{ fontSize: 10, color: step === i + 1 ? C.navy : '#64748b' }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: 16 }}>
        {/* Step 1: Upload */}
        {step === 1 && (
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, textAlign: 'center', border: '2px dashed #e2e8f0' }} onClick={() => fileRef.current?.click()}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📁</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: C.navy, marginBottom: 8 }}>Upload CSV File</div>
            <div style={{ color: '#64748b', fontSize: 13, marginBottom: 20 }}>Download from Facebook Ads Manager</div>
            <button style={{ background: C.gold, color: '#0f2439', padding: '12px 24px', borderRadius: 10, border: 'none', fontWeight: 600, cursor: 'pointer' }}>Choose File</button>
            <input ref={fileRef} type="file" accept=".csv" onChange={handleFile} style={{ display: 'none' }} />
          </div>
        )}

        {/* Step 2: Map */}
        {step === 2 && (
          <div style={{ background: '#fff', borderRadius: 16, padding: 20 }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 600, color: C.navy }}>{file?.name}</div>
              <div style={{ fontSize: 13, color: '#64748b' }}>{data.length} rows found</div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: C.navy, marginBottom: 12 }}>Map Columns</h3>
              {[['name', 'Name *'], ['phone', 'Phone *'], ['budget', 'Budget'], ['source', 'Source']].map(([k, l]) => (
                <div key={k} style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>{l}</label>
                  <select value={mapping[k]} onChange={e => setMapping({ ...mapping, [k]: e.target.value })} style={inputStyle}>
                    <option value="">-- Select --</option>
                    {headers.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: C.navy, marginBottom: 12 }}>Import Settings</h3>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>Assign To</label>
                <select value={assignTo} onChange={e => setAssignTo(e.target.value)} style={inputStyle}>
                  <option value="">Unassigned</option>
                  {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>Project</label>
                <select value={project} onChange={e => setProject(e.target.value)} style={inputStyle}>
                  {PROJECTS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <button onClick={process} disabled={!mapping.name || !mapping.phone} style={{ width: '100%', padding: 16, borderRadius: 12, border: 'none', background: mapping.name && mapping.phone ? C.gold : '#e2e8f0', color: mapping.name && mapping.phone ? '#0f2439' : '#94a3b8', fontWeight: 600, fontSize: 16, cursor: mapping.name && mapping.phone ? 'pointer' : 'not-allowed' }}>
              Check Duplicates →
            </button>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
              <div style={{ background: '#dcfce7', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#22c55e' }}>{preview.length}</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>New</div>
              </div>
              <div style={{ background: '#fef3c7', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#f59e0b' }}>{dupes.length}</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Duplicates</div>
              </div>
              <div style={{ background: '#f1f5f9', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: C.navy }}>{data.length}</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Total</div>
              </div>
            </div>

            {dupes.length > 0 && (
              <div style={{ background: '#fef2f2', borderRadius: 12, padding: 14, marginBottom: 16 }}>
                <div style={{ fontWeight: 600, color: '#dc2626', fontSize: 14, marginBottom: 8 }}>⚠️ {dupes.length} Duplicates (will be skipped)</div>
                <div style={{ maxHeight: 120, overflowY: 'auto', fontSize: 12, color: '#7f1d1d' }}>
                  {dupes.slice(0, 5).map((d, i) => <div key={i}>{d.name} - {d.phone} ({d.reason})</div>)}
                  {dupes.length > 5 && <div>...and {dupes.length - 5} more</div>}
                </div>
              </div>
            )}

            {preview.length > 0 && (
              <div style={{ background: '#fff', borderRadius: 12, padding: 14, marginBottom: 20, maxHeight: 200, overflowY: 'auto' }}>
                <div style={{ fontWeight: 600, color: '#166534', fontSize: 14, marginBottom: 8 }}>✅ {preview.length} Ready to import</div>
                {preview.slice(0, 5).map((l, i) => (
                  <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
                    {l.name} - {l.phone}
                  </div>
                ))}
                {preview.length > 5 && <div style={{ color: '#64748b', fontSize: 12, marginTop: 8 }}>...and {preview.length - 5} more</div>}
              </div>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, padding: 16, borderRadius: 12, border: '2px solid #e2e8f0', background: '#fff', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}>Back</button>
              <button onClick={doImport} disabled={!preview.length} style={{ flex: 2, padding: 16, borderRadius: 12, border: 'none', background: preview.length ? '#22c55e' : '#e2e8f0', color: '#fff', fontWeight: 600, fontSize: 16, cursor: preview.length ? 'pointer' : 'not-allowed' }}>
                Import {preview.length} Leads ✓
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Done */}
        {step === 4 && (
          <div style={{ background: '#fff', borderRadius: 16, padding: 40, textAlign: 'center' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.navy, marginBottom: 8 }}>Import Complete!</div>
            <div style={{ color: '#64748b', marginBottom: 24 }}>
              {result?.imported} leads imported{result?.skipped > 0 && `, ${result.skipped} skipped`}
            </div>
            <button onClick={() => nav('/crm/leads')} style={{ padding: '14px 28px', borderRadius: 12, border: 'none', background: C.gold, color: '#0f2439', fontWeight: 600, cursor: 'pointer' }}>
              View Leads →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
