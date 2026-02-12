import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLeads } from '../context/LeadContext';

const C = { navy: '#1a3a5c', gold: '#c9a962' };

export default function Duplicates() {
  const nav = useNavigate();
  const { getDuplicates, deleteLead, employees } = useLeads();
  const [selected, setSelected] = useState(new Set());

  const dupes = getDuplicates();
  const total = dupes.reduce((s, d) => s + d.leads.length - 1, 0);

  const toggle = (id) => {
    const n = new Set(selected);
    n.has(id) ? n.delete(id) : n.add(id);
    setSelected(n);
  };

  const deleteSelected = () => {
    if (!selected.size || !window.confirm(`Delete ${selected.size} leads?`)) return;
    selected.forEach(id => deleteLead(id));
    setSelected(new Set());
  };

  const scoreColor = (s) => s === 'Hot' ? '#ef4444' : s === 'Warm' ? '#f59e0b' : '#3b82f6';

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: 100 }}>
      <div style={{ background: '#f59e0b', padding: '20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => nav(-1)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, padding: 0 }}>←</button>
          <div>
            <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>🔍 Duplicates</h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12 }}>{dupes.length} numbers with {total} duplicates</p>
          </div>
        </div>
      </div>

      {selected.size > 0 && (
        <div style={{ position: 'sticky', top: 0, background: '#ef4444', padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
          <span style={{ color: '#fff', fontWeight: 600 }}>{selected.size} selected</span>
          <button onClick={deleteSelected} style={{ background: '#fff', color: '#ef4444', padding: '8px 16px', borderRadius: 8, border: 'none', fontWeight: 600, cursor: 'pointer' }}>
            🗑️ Delete
          </button>
        </div>
      )}

      <div style={{ padding: 16 }}>
        {dupes.length === 0 ? (
          <div style={{ background: '#dcfce7', borderRadius: 16, padding: 40, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#166534' }}>No Duplicates!</div>
            <div style={{ color: '#64748b', marginTop: 4 }}>All phone numbers are unique</div>
          </div>
        ) : (
          dupes.map(group => (
            <div key={group.phone} style={{ background: '#fff', borderRadius: 16, marginBottom: 16, overflow: 'hidden', border: '1px solid #fde68a' }}>
              <div style={{ background: '#fef3c7', padding: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ background: '#f59e0b', color: '#fff', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{group.leads.length}</span>
                <div>
                  <div style={{ fontWeight: 600, color: C.navy }}>📱 {group.phone}</div>
                  <div style={{ fontSize: 11, color: '#92400e' }}>{group.leads.length} entries</div>
                </div>
              </div>
              
              {group.leads.map((l, i) => (
                <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderTop: '1px solid #f1f5f9', background: i === 0 ? '#f0fdf4' : selected.has(l.id) ? '#fef2f2' : '#fff' }}>
                  {i === 0 ? (
                    <span style={{ fontSize: 20 }}>👑</span>
                  ) : (
                    <input type="checkbox" checked={selected.has(l.id)} onChange={() => toggle(l.id)} style={{ width: 20, height: 20 }} />
                  )}
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: scoreColor(l.score), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 14 }}>{l.name[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, color: C.navy, fontSize: 14 }}>{l.name}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>{l.project} • {l.source}</div>
                  </div>
                  <Link to={`/crm/lead/${l.id}`} style={{ color: C.gold, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>View</Link>
                </div>
              ))}
            </div>
          ))
        )}

        <div style={{ background: '#f1f5f9', borderRadius: 12, padding: 16, marginTop: 8 }}>
          <div style={{ fontSize: 13, color: '#64748b' }}>
            💡 <strong>Tip:</strong> Keep the oldest entry (👑), delete newer duplicates
          </div>
        </div>
      </div>
    </div>
  );
}
