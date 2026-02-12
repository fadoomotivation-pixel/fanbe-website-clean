import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const C = { navy: '#1a3a5c', gold: '#c9a962' };

export default function CrmLayout() {
  const { user, logout, canManage } = useAuth();
  const loc = useLocation();
  const nav = useNavigate();
  const [showMore, setShowMore] = useState(false);

  const isActive = (path) => loc.pathname === path || (path !== '/crm' && loc.pathname.startsWith(path));
  const handleLogout = () => { logout(); nav('/crm/login'); };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Outlet />

      {/* Bottom Navigation */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff',
        borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-around',
        padding: '8px 0', paddingBottom: 'max(8px, env(safe-area-inset-bottom))', zIndex: 50
      }}>
        <Link to="/crm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, textDecoration: 'none', padding: '6px 12px' }}>
          <span style={{ fontSize: 22, opacity: isActive('/crm') && loc.pathname === '/crm' ? 1 : 0.5 }}>🏠</span>
          <span style={{ fontSize: 10, color: isActive('/crm') && loc.pathname === '/crm' ? C.navy : '#64748b' }}>Home</span>
        </Link>

        <Link to="/crm/leads" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, textDecoration: 'none', padding: '6px 12px' }}>
          <span style={{ fontSize: 22, opacity: isActive('/crm/leads') ? 1 : 0.5 }}>📋</span>
          <span style={{ fontSize: 10, color: isActive('/crm/leads') ? C.navy : '#64748b' }}>Leads</span>
        </Link>

        <Link to="/crm/call" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', marginTop: -20 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(34,197,94,0.4)' }}>
            <span style={{ fontSize: 26 }}>📞</span>
          </div>
        </Link>

        <Link to="/crm/report" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, textDecoration: 'none', padding: '6px 12px' }}>
          <span style={{ fontSize: 22, opacity: isActive('/crm/report') ? 1 : 0.5 }}>📊</span>
          <span style={{ fontSize: 10, color: isActive('/crm/report') ? C.navy : '#64748b' }}>EOD</span>
        </Link>

        <button onClick={() => setShowMore(!showMore)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px' }}>
          <span style={{ fontSize: 22 }}>☰</span>
          <span style={{ fontSize: 10, color: '#64748b' }}>More</span>
        </button>
      </nav>

      {/* More Menu */}
      {showMore && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100 }} onClick={() => setShowMore(false)}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'absolute', bottom: 70, left: 16, right: 16, background: '#fff', borderRadius: 20, padding: 16, maxHeight: '60vh', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #f1f5f9', marginBottom: 8 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: C.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f2439', fontWeight: 700, fontSize: 20 }}>
                {user?.name?.[0]}
              </div>
              <div>
                <div style={{ fontWeight: 600, color: C.navy }}>{user?.name}</div>
                <div style={{ fontSize: 12, color: '#64748b', textTransform: 'capitalize' }}>{user?.role}</div>
              </div>
            </div>

            {[
              { to: '/crm/add', icon: '➕', label: 'Add New Lead' },
              ...(canManage ? [
                { to: '/crm/import', icon: '📤', label: 'Bulk Import' },
                { to: '/crm/duplicates', icon: '🔍', label: 'Check Duplicates' }
              ] : []),
              { to: '/crm/report', icon: '📊', label: 'EOD Report' },
              { to: '/', icon: '🌐', label: 'Go to Website' }
            ].map(item => (
              <Link key={item.to} to={item.to} onClick={() => setShowMore(false)} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '14px 8px',
                textDecoration: 'none', borderRadius: 12
              }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <span style={{ fontWeight: 500, color: C.navy }}>{item.label}</span>
              </Link>
            ))}

            <button onClick={handleLogout} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 8px',
              width: '100%', background: '#fef2f2', border: 'none', borderRadius: 12,
              marginTop: 8, cursor: 'pointer'
            }}>
              <span style={{ fontSize: 22 }}>🚪</span>
              <span style={{ fontWeight: 500, color: '#ef4444' }}>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
