import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLeads } from '../context/LeadContext';

const C = { navy: '#1a3a5c', gold: '#c9a962' };

export default function Dashboard() {
  const { user, canManage } = useAuth();
  const { leads, getLeadStats, getStats, getDuplicates } = useLeads();
  const stats = getLeadStats();
  const today = getStats();
  const dupes = canManage ? getDuplicates() : [];

  const todayLeads = leads.filter(l => {
    const t = new Date().toISOString().split('T')[0];
    return l.followUpDate === t && !['Lost', 'Booking'].includes(l.status);
  }).slice(0, 5);

  const hotLeads = leads.filter(l => l.score === 'Hot' && !['Lost', 'Booking'].includes(l.status)).slice(0, 5);

  const scoreColor = (s) => s === 'Hot' ? '#ef4444' : s === 'Warm' ? '#f59e0b' : '#3b82f6';
  const statusColor = (s) => ({ New: '#3b82f6', Contacted: '#8b5cf6', 'Follow Up': '#f59e0b', 'Site Visit Scheduled': '#06b6d4', Negotiation: '#f97316', Booking: '#22c55e', Lost: '#ef4444' }[s] || '#64748b');

  return (
    <div style={{ paddingBottom: 90 }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${C.navy}, #0f2439)`, padding: '20px 16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Welcome back</div>
            <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>{user?.name} 👋</div>
          </div>
          <div style={{ background: C.gold, width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f2439', fontWeight: 700, fontSize: 18 }}>
            {user?.name?.[0]}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[
            { n: stats.total, l: 'Leads', i: '📋' },
            { n: stats.hot, l: 'Hot', i: '🔥' },
            { n: stats.followUps, l: 'Follow-up', i: '📞' },
            { n: today.total, l: 'Calls Today', i: '✅' }
          ].map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 18 }}>{s.i}</div>
              <div style={{ color: '#fff', fontSize: 22, fontWeight: 700 }}>{s.n}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '16px 16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Link to="/crm/call" style={{ background: '#22c55e', borderRadius: 14, padding: 16, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 28 }}>📞</span>
          <div>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>Log Call</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>Quick entry</div>
          </div>
        </Link>
        <Link to="/crm/add" style={{ background: C.gold, borderRadius: 14, padding: 16, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 28 }}>➕</span>
          <div>
            <div style={{ color: '#0f2439', fontWeight: 600, fontSize: 15 }}>Add Lead</div>
            <div style={{ color: 'rgba(0,0,0,0.5)', fontSize: 11 }}>New inquiry</div>
          </div>
        </Link>
      </div>

      {/* Duplicate Alert */}
      {dupes.length > 0 && (
        <Link to="/crm/duplicates" style={{ display: 'block', margin: '16px 16px 0', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 14, padding: 14, textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24 }}>⚠️</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: '#92400e', fontSize: 14 }}>{dupes.length} Duplicate Numbers</div>
              <div style={{ color: '#a16207', fontSize: 12 }}>Tap to review</div>
            </div>
            <span style={{ color: '#92400e' }}>→</span>
          </div>
        </Link>
      )}

      {/* Today's Follow-ups */}
      {todayLeads.length > 0 && (
        <div style={{ padding: '20px 16px 0' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: C.navy, marginBottom: 12 }}>📅 Today's Follow-ups</h3>
          {todayLeads.map(l => (
            <Link key={l.id} to={`/crm/lead/${l.id}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fefce8', border: '1px solid #fef08a', borderRadius: 14, padding: 14, marginBottom: 10, textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: scoreColor(l.score), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600 }}>{l.name[0]}</div>
                <div>
                  <div style={{ fontWeight: 600, color: C.navy, fontSize: 15 }}>{l.name}</div>
                  <div style={{ color: '#64748b', fontSize: 12 }}>{l.phone} • {l.project}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <a href={`tel:${l.phone}`} onClick={e => e.stopPropagation()} style={{ width: 36, height: 36, background: C.navy, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📞</a>
                <a href={`https://wa.me/91${l.phone}`} onClick={e => e.stopPropagation()} style={{ width: 36, height: 36, background: '#25D366', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>💬</a>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Hot Leads */}
      {hotLeads.length > 0 && (
        <div style={{ padding: '20px 16px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: C.navy }}>🔥 Hot Leads</h3>
            <Link to="/crm/leads?score=Hot" style={{ color: C.gold, fontSize: 13, textDecoration: 'none' }}>View All</Link>
          </div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
            {hotLeads.map(l => (
              <Link key={l.id} to={`/crm/lead/${l.id}`} style={{ background: '#fff', border: '1px solid #fee2e2', borderRadius: 14, padding: 14, minWidth: 180, textDecoration: 'none', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600 }}>{l.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: C.navy, fontSize: 14 }}>{l.name}</div>
                    <div style={{ color: '#64748b', fontSize: 11 }}>{l.project}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ background: `${statusColor(l.status)}15`, color: statusColor(l.status), padding: '4px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{l.status}</span>
                  <span style={{ color: '#64748b', fontSize: 11 }}>{l.budget}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* My Progress Today */}
      <div style={{ padding: '20px 16px' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: C.navy, marginBottom: 12 }}>📊 My Progress Today</h3>
        <div style={{ background: '#fff', borderRadius: 14, padding: 16, border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ color: '#64748b', fontSize: 14 }}>Calls Made</span>
            <span style={{ fontWeight: 600, color: C.navy }}>{today.total} / {user?.target || 30}</span>
          </div>
          <div style={{ height: 8, background: '#e2e8f0', borderRadius: 4, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ height: '100%', background: today.total >= (user?.target || 30) ? '#22c55e' : C.gold, width: `${Math.min(100, (today.total / (user?.target || 30)) * 100)}%`, borderRadius: 4 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            <div style={{ textAlign: 'center', padding: 10, background: '#f0fdf4', borderRadius: 10 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#22c55e' }}>{today.connected}</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Connected</div>
            </div>
            <div style={{ textAlign: 'center', padding: 10, background: '#fef3c7', borderRadius: 10 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#f59e0b' }}>{today.notReachable + today.busy}</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Not Reached</div>
            </div>
            <div style={{ textAlign: 'center', padding: 10, background: '#dbeafe', borderRadius: 10 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#3b82f6' }}>{today.siteVisits}</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Site Visits</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
