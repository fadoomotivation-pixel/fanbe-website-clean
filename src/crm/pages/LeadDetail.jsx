import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLeads } from '../context/LeadContext';

const C = { navy: '#1a3a5c', gold: '#c9a962' };

export default function LeadDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { canManage } = useAuth();
  const { leads, updateLead, deleteLead, employees, STATUSES, SCORES, PROJECTS, PLOT_SIZES } = useLeads();
  
  const lead = leads.find(l => l.id === Number(id));
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(lead || {});

  if (!lead) return <div style={{ padding: 40, textAlign: 'center' }}>Lead not found</div>;

  const scoreColor = (s) => s === 'Hot' ? '#ef4444' : s === 'Warm' ? '#f59e0b' : '#3b82f6';
  const statusColor = (s) => ({ New: '#3b82f6', Contacted: '#8b5cf6', 'Follow Up': '#f59e0b', 'Site Visit Scheduled': '#06b6d4', 'Site Visit Done': '#0891b2', Negotiation: '#f97316', Booking: '#22c55e', Lost: '#ef4444' }[s] || '#64748b');

  const save = () => { updateLead(lead.id, form); setEditing(false); };
  const remove = () => { if (window.confirm('Delete this lead?')) { deleteLead(lead.id); nav('/crm/leads'); } };

  const inputStyle = { width: '100%', padding: 12, borderRadius: 10, border: '2px solid #e2e8f0', fontSize: 15, boxSizing: 'border-box' };

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${C.navy}, #0f2439)`, padding: '20px 16px' }}>
        <button onClick={() => nav(-1)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 16, marginBottom: 12, padding: 0, cursor: 'pointer' }}>← Back</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: scoreColor(lead.score), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 22 }}>{lead.name[0]}</div>
          <div style={{ flex: 1 }}>
            <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{lead.name}</h1>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ background: statusColor(lead.status), color: '#fff', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{lead.status}</span>
              <span style={{ background: scoreColor(lead.score), color: '#fff', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{lead.score}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <a href={`tel:${lead.phone}`} style={{ flex: 1, background: '#fff', padding: 14, borderRadius: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>📞</span>
            <span style={{ fontWeight: 600, color: C.navy }}>Call</span>
          </a>
          <a href={`https://wa.me/91${lead.phone}`} style={{ flex: 1, background: '#25D366', padding: 14, borderRadius: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>💬</span>
            <span style={{ fontWeight: 600, color: '#fff' }}>WhatsApp</span>
          </a>
          <Link to="/crm/call" style={{ flex: 1, background: C.gold, padding: 14, borderRadius: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>📝</span>
            <span style={{ fontWeight: 600, color: '#0f2439' }}>Log Call</span>
          </Link>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: 16 }}>
        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 14, textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.navy }}>{lead.callAttempts || 0}</div>
            <div style={{ fontSize: 11, color: '#64748b' }}>Calls Made</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 14, textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: lead.lastOutcome === 'connected' ? '#22c55e' : '#f59e0b' }}>{lead.lastOutcome || 'Never'}</div>
            <div style={{ fontSize: 11, color: '#64748b' }}>Last Outcome</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 14, textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>{lead.followUpDate || 'Not set'}</div>
            <div style={{ fontSize: 11, color: '#64748b' }}>Follow-up</div>
          </div>
        </div>

        {/* Details Card */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #e2e8f0', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: C.navy }}>Lead Details</h3>
            <button onClick={() => { setForm(lead); setEditing(!editing); }} style={{ background: editing ? '#f1f5f9' : C.gold, border: 'none', padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, color: editing ? '#64748b' : '#0f2439', cursor: 'pointer' }}>
              {editing ? 'Cancel' : '✏️ Edit'}
            </button>
          </div>

          {editing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>Phone</label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>Project</label>
                  <select value={form.project} onChange={e => setForm({ ...form, project: e.target.value })} style={inputStyle}>
                    {PROJECTS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>Plot Size</label>
                  <select value={form.plotSize} onChange={e => setForm({ ...form, plotSize: e.target.value })} style={inputStyle}>
                    {PLOT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={inputStyle}>
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>Score</label>
                  <select value={form.score} onChange={e => setForm({ ...form, score: e.target.value })} style={inputStyle}>
                    {SCORES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>Budget</label>
                <input value={form.budget || ''} onChange={e => setForm({ ...form, budget: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>Follow-up Date</label>
                <input type="date" value={form.followUpDate || ''} onChange={e => setForm({ ...form, followUpDate: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>Assign To</label>
                <select value={form.assignedTo || ''} onChange={e => setForm({ ...form, assignedTo: e.target.value ? Number(e.target.value) : null })} style={inputStyle}>
                  <option value="">Unassigned</option>
                  {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
              </div>
              <button onClick={save} style={{ padding: 14, borderRadius: 10, border: 'none', background: '#22c55e', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                ✓ Save Changes
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                ['Phone', lead.phone],
                ['Email', lead.email || '-'],
                ['Project', lead.project],
                ['Plot Size', lead.plotSize],
                ['Budget', lead.budget || '-'],
                ['City', lead.city || '-'],
                ['Source', lead.source],
                ['Assigned', employees.find(e => e.id === lead.assignedTo)?.name || 'Unassigned'],
                ['Follow-up', lead.followUpDate || 'Not set'],
                ['Created', lead.createdAt]
              ].map(([label, value]) => (
                <div key={label}>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 14, color: C.navy, fontWeight: 500 }}>{value}</div>
                </div>
              ))}
              {lead.feedback && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>Buyer Feedback</div>
                  <div style={{ fontSize: 14, color: '#f59e0b', fontWeight: 500 }}>{lead.feedback}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Delete Button */}
        {canManage && !editing && (
          <button onClick={remove} style={{ width: '100%', padding: 14, borderRadius: 10, border: 'none', background: '#fef2f2', color: '#ef4444', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
            🗑️ Delete Lead
          </button>
        )}
      </div>
    </div>
  );
}
