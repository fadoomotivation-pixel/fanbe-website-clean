import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLeads } from '../context/LeadContext';

const C = { navy: '#1a3a5c', gold: '#c9a962' };

export default function EODReport() {
  const nav = useNavigate();
  const { user, canManage } = useAuth();
  const { getStats, getAllStats } = useLeads();
  
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewAll, setViewAll] = useState(false);

  const myStats = getStats(date, user?.id);
  const allStats = canManage ? getAllStats(date) : [];

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const StatCard = ({ stats }) => (
    <div style={{ background: '#fff', borderRadius: 16, padding: 20, marginBottom: 16, border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.navy }}>{stats.userName}</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>Target: {stats.target} calls/day</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: stats.total >= stats.target ? '#22c55e' : C.navy }}>{stats.total}</div>
          <div style={{ fontSize: 11, color: stats.total >= stats.target ? '#22c55e' : '#f59e0b' }}>
            {stats.total >= stats.target ? '✅ Target Met' : `${stats.target - stats.total} more needed`}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ height: 10, background: '#e2e8f0', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ height: '100%', background: stats.total >= stats.target ? '#22c55e' : C.gold, width: `${Math.min(100, (stats.total / stats.target) * 100)}%`, borderRadius: 5, transition: 'width 0.5s' }} />
      </div>

      {/* Call Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
        {[
          { n: stats.connected, l: 'Connected', c: '#22c55e', bg: '#dcfce7' },
          { n: stats.notReachable, l: 'Not Reachable', c: '#f59e0b', bg: '#fef3c7' },
          { n: stats.busy, l: 'Busy', c: '#ef4444', bg: '#fef2f2' }
        ].map(s => (
          <div key={s.l} style={{ background: s.bg, borderRadius: 10, padding: 12, textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.c }}>{s.n}</div>
            <div style={{ fontSize: 10, color: '#64748b' }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
        {[
          { n: stats.switchedOff, l: 'Switched Off', c: '#64748b', bg: '#f1f5f9' },
          { n: stats.callback, l: 'Callback', c: '#8b5cf6', bg: '#ede9fe' },
          { n: stats.siteVisits, l: 'Site Visits', c: '#0891b2', bg: '#cffafe' }
        ].map(s => (
          <div key={s.l} style={{ background: s.bg, borderRadius: 10, padding: 12, textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.c }}>{s.n}</div>
            <div style={{ fontSize: 10, color: '#64748b' }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Objections */}
      {stats.objections?.length > 0 && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.navy, marginBottom: 10 }}>Buyer Objections:</div>
          {stats.objections.map((o, i) => (
            <div key={i} style={{ background: '#fef3c7', padding: 10, borderRadius: 8, marginBottom: 8, fontSize: 13 }}>
              <span style={{ fontWeight: 600, color: '#92400e' }}>{o.name}:</span>
              <span style={{ color: '#78350f', marginLeft: 6 }}>{o.feedback}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${C.navy}, #0f2439)`, padding: '20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button onClick={() => nav(-1)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, padding: 0 }}>←</button>
          <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>📊 EOD Report</h1>
        </div>

        {/* Date Selector */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', fontSize: 15 }} />
          {canManage && (
            <button onClick={() => setViewAll(!viewAll)} style={{ padding: '12px 16px', borderRadius: 10, border: 'none', background: viewAll ? C.gold : 'rgba(255,255,255,0.2)', color: viewAll ? '#0f2439' : '#fff', fontWeight: 600, fontSize: 13 }}>
              {viewAll ? 'My Report' : 'All Team'}
            </button>
          )}
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 14, color: '#64748b', marginBottom: 16 }}>Report for {formatDate(date)}</div>

        {viewAll && canManage ? (
          <>
            {/* Team Summary */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 20, marginBottom: 16, border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: C.navy, marginBottom: 16 }}>Team Summary</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                <div style={{ background: '#f0fdf4', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#22c55e' }}>{allStats.reduce((s, e) => s + e.total, 0)}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Total Calls</div>
                </div>
                <div style={{ background: '#dcfce7', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#166534' }}>{allStats.reduce((s, e) => s + e.connected, 0)}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Connected</div>
                </div>
                <div style={{ background: '#cffafe', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#0891b2' }}>{allStats.reduce((s, e) => s + e.siteVisits, 0)}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Site Visits Fixed</div>
                </div>
                <div style={{ background: '#fef3c7', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#d97706' }}>{allStats.reduce((s, e) => s + (e.objections?.length || 0), 0)}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Objections</div>
                </div>
              </div>
            </div>

            {/* Individual Reports */}
            {allStats.map((s, i) => <StatCard key={i} stats={s} />)}
          </>
        ) : (
          <StatCard stats={myStats} />
        )}

        {/* No data message */}
        {(viewAll ? allStats.every(s => s.total === 0) : myStats.total === 0) && (
          <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📞</div>
            <div style={{ fontSize: 16, marginBottom: 4 }}>No calls logged</div>
            <div style={{ fontSize: 13 }}>Start logging calls to see your report</div>
          </div>
        )}

        {/* Export hint */}
        <div style={{ background: '#f1f5f9', borderRadius: 12, padding: 16, marginTop: 16 }}>
          <div style={{ fontSize: 13, color: '#64748b' }}>
            💡 <strong>Tip:</strong> Take a screenshot of this report to share with your team lead
          </div>
        </div>
      </div>
    </div>
  );
}
