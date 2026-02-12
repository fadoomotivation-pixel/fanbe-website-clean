import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLeads } from '../context/LeadContext';

const C = { navy: '#1a3a5c', gold: '#c9a962' };

export default function Leads() {
  const { leads, STATUSES, SCORES, PROJECTS } = useLeads();
  const [params] = useSearchParams();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(params.get('status') || '');
  const [score, setScore] = useState(params.get('score') || '');
  const [project, setProject] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return leads.filter(l => {
      if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.phone.includes(search)) return false;
      if (status && l.status !== status) return false;
      if (score && l.score !== score) return false;
      if (project && l.project !== project) return false;
      return true;
    });
  }, [leads, search, status, score, project]);

  const scoreColor = (s) => s === 'Hot' ? '#ef4444' : s === 'Warm' ? '#f59e0b' : '#3b82f6';
  const statusColor = (s) => ({ New: '#3b82f6', Contacted: '#8b5cf6', 'Follow Up': '#f59e0b', 'Site Visit Scheduled': '#06b6d4', 'Site Visit Done': '#0891b2', Negotiation: '#f97316', Booking: '#22c55e', Lost: '#ef4444' }[s] || '#64748b');

  return (
    <div style={{ paddingBottom: 90 }}>
      {/* Header */}
      <div style={{ background: '#fff', padding: '16px', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search leads..." style={{ flex: 1, padding: 12, borderRadius: 10, border: '2px solid #e2e8f0', fontSize: 15, boxSizing: 'border-box' }} />
          <button onClick={() => setShowFilters(!showFilters)} style={{ padding: '12px 16px', borderRadius: 10, border: '2px solid #e2e8f0', background: showFilters ? C.navy : '#fff', color: showFilters ? '#fff' : C.navy, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            🔻
          </button>
        </div>

        {showFilters && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <select value={status} onChange={e => setStatus(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '2px solid #e2e8f0', fontSize: 13, flex: 1, minWidth: 100 }}>
              <option value="">All Status</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={score} onChange={e => setScore(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '2px solid #e2e8f0', fontSize: 13, flex: 1, minWidth: 80 }}>
              <option value="">All Score</option>
              {SCORES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={project} onChange={e => setProject(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '2px solid #e2e8f0', fontSize: 13, flex: 1, minWidth: 120 }}>
              <option value="">All Projects</option>
              {PROJECTS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        )}

        <div style={{ marginTop: 8, fontSize: 13, color: '#64748b' }}>{filtered.length} leads</div>
      </div>

      {/* Lead List */}
      <div style={{ padding: 16 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>📋</div>
            <div>No leads found</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(l => (
              <Link key={l.id} to={`/crm/lead/${l.id}`} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 14, textDecoration: 'none' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: scoreColor(l.score), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 18, flexShrink: 0 }}>
                  {l.name[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, color: C.navy, fontSize: 15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.name}</span>
                    {l.callAttempts === 0 && <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '2px 6px', borderRadius: 4, fontSize: 9, fontWeight: 600 }}>NEW</span>}
                  </div>
                  <div style={{ color: '#64748b', fontSize: 12, marginBottom: 4 }}>{l.phone} • {l.project}</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ background: `${statusColor(l.status)}15`, color: statusColor(l.status), padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600 }}>{l.status}</span>
                    {l.budget && <span style={{ color: '#64748b', fontSize: 11 }}>{l.budget}</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <a href={`tel:${l.phone}`} onClick={e => e.stopPropagation()} style={{ width: 40, height: 40, background: C.navy, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📞</a>
                  <a href={`https://wa.me/91${l.phone}`} onClick={e => e.stopPropagation()} style={{ width: 40, height: 40, background: '#25D366', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>💬</a>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
