import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLeads } from '../context/LeadContext';

const C = { navy: '#1a3a5c', gold: '#c9a962' };

export default function AddLead() {
  const nav = useNavigate();
  const { user } = useAuth();
  const { addLead, employees, PROJECTS, PLOT_SIZES, SOURCES, SCORES } = useLeads();
  
  const [form, setForm] = useState({
    name: '', phone: '', email: '', city: '', project: PROJECTS[0], plotSize: '100 sq.yd',
    source: 'WhatsApp', score: 'Warm', budget: '', notes: '', assignedTo: user?.role === 'employee' ? user.id : null,
    followUpDate: new Date().toISOString().split('T')[0]
  });
  const [err, setErr] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) { setErr('Name and Phone required'); return; }
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, '').slice(-10))) { setErr('Invalid phone number'); return; }
    
    const lead = addLead({ ...form, phone: form.phone.replace(/\D/g, '').slice(-10), status: 'New' });
    nav(`/crm/lead/${lead.id}`);
  };

  const inputStyle = { width: '100%', padding: 14, borderRadius: 12, border: '2px solid #e2e8f0', fontSize: 16, boxSizing: 'border-box' };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: 100 }}>
      <div style={{ background: C.gold, padding: '20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => nav(-1)} style={{ background: 'none', border: 'none', color: '#0f2439', fontSize: 22, padding: 0 }}>←</button>
          <h1 style={{ color: '#0f2439', fontSize: 20, fontWeight: 700 }}>➕ Add New Lead</h1>
        </div>
      </div>

      <form onSubmit={submit} style={{ padding: 16 }}>
        {err && <div style={{ background: '#fef2f2', color: '#dc2626', padding: 12, borderRadius: 10, marginBottom: 16, fontSize: 14 }}>{err}</div>}

        <div style={{ background: '#fff', borderRadius: 16, padding: 20, marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: C.navy, marginBottom: 16 }}>Contact Info</h3>
          
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#64748b', marginBottom: 6 }}>Name *</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" style={inputStyle} />
          </div>
          
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#64748b', marginBottom: 6 }}>Phone *</label>
            <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="10 digit number" style={inputStyle} />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#64748b', marginBottom: 6 }}>Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#64748b', marginBottom: 6 }}>City</label>
              <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} style={inputStyle} />
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 20, marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: C.navy, marginBottom: 16 }}>Interest</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#64748b', marginBottom: 6 }}>Project</label>
              <select value={form.project} onChange={e => setForm({ ...form, project: e.target.value })} style={inputStyle}>
                {PROJECTS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#64748b', marginBottom: 6 }}>Plot Size</label>
              <select value={form.plotSize} onChange={e => setForm({ ...form, plotSize: e.target.value })} style={inputStyle}>
                {PLOT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#64748b', marginBottom: 6 }}>Budget</label>
              <input value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} placeholder="e.g., ₹10-15 Lakh" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#64748b', marginBottom: 6 }}>Source</label>
              <select value={form.source} onChange={e => setForm({ ...form, source: e.target.value })} style={inputStyle}>
                {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#64748b', marginBottom: 6 }}>Score</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {SCORES.map(s => (
                <button key={s} type="button" onClick={() => setForm({ ...form, score: s })} style={{
                  flex: 1, padding: 12, borderRadius: 10, border: form.score === s ? 'none' : '2px solid #e2e8f0',
                  background: form.score === s ? (s === 'Hot' ? '#ef4444' : s === 'Warm' ? '#f59e0b' : '#3b82f6') : '#fff',
                  color: form.score === s ? '#fff' : '#64748b', fontWeight: 600, cursor: 'pointer'
                }}>{s}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#64748b', marginBottom: 6 }}>Follow-up</label>
              <input type="date" value={form.followUpDate} onChange={e => setForm({ ...form, followUpDate: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#64748b', marginBottom: 6 }}>Assign To</label>
              <select value={form.assignedTo || ''} onChange={e => setForm({ ...form, assignedTo: e.target.value ? Number(e.target.value) : null })} style={inputStyle}>
                <option value="">Unassigned</option>
                {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        <button type="submit" style={{ width: '100%', padding: 16, borderRadius: 14, border: 'none', background: '#22c55e', color: '#fff', fontSize: 17, fontWeight: 600, cursor: 'pointer' }}>
          ✓ Create Lead
        </button>
      </form>
    </div>
  );
}
