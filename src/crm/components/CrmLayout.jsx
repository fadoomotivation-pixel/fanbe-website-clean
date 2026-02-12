import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const colors = {
  navy: '#1a3a5c',
  navyDark: '#0f2439',
  teal: '#4a7c8a',
  gold: '#c9a962',
  goldLight: '#d4bc7d'
};

function CrmLayout() {
  const { user, logout, isAdmin, isSubAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/crm/login');
  };

  const navItems = [
    { path: '/crm/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/crm/leads', label: 'All Leads', icon: '📋' },
    { path: '/crm/leads/add', label: 'Add Lead', icon: '➕' },
  ];

  if (isAdmin || isSubAdmin) {
    navItems.push({ path: '/crm/employees', label: 'Team', icon: '👥' });
  }

  const isActive = (path) => {
    if (path === '/crm/dashboard') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        background: colors.navyDark,
        display: 'none',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100
      }} className="sidebar-desktop">
        {/* Logo */}
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: '#fff',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: colors.navy, fontWeight: 'bold', fontSize: '18px', fontFamily: "'Playfair Display', serif" }}>FG</span>
            </div>
            <div>
              <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '16px' }}>Fanbe CRM</div>
              <div style={{ color: colors.gold, fontSize: '11px' }}>Lead Management</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '10px',
                textDecoration: 'none',
                color: isActive(item.path) ? '#fff' : 'rgba(255,255,255,0.6)',
                background: isActive(item.path) ? 'rgba(255,255,255,0.1)' : 'transparent',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User Info */}
        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: colors.gold,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.navyDark,
              fontWeight: 'bold',
              fontSize: '16px'
            }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <div style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>{user?.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', textTransform: 'capitalize' }}>{user?.role}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        background: colors.navyDark,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99
      }} className="mobile-header">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: colors.navy, fontWeight: 'bold', fontSize: '14px' }}>FG</span>
          </div>
          <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>Fanbe CRM</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '10px', borderRadius: '8px', color: '#fff', fontSize: '20px', cursor: 'pointer' }}
        >
          ☰
        </button>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200 }} className="mobile-sidebar-overlay">
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setSidebarOpen(false)} />
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '280px', background: colors.navyDark, padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>Menu</span>
              <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}>✕</button>
            </div>
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: isActive(item.path) ? '#fff' : 'rgba(255,255,255,0.6)',
                  background: isActive(item.path) ? 'rgba(255,255,255,0.1)' : 'transparent',
                  fontSize: '15px',
                  marginBottom: '6px'
                }}
              >
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '8px' }}>{user?.name} ({user?.role})</div>
              <button onClick={handleLogout} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', cursor: 'pointer' }}>🚪 Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: '0', paddingTop: '60px' }} className="main-content">
        <Outlet />
      </main>

      <style>{`
        @media (min-width: 1024px) {
          .sidebar-desktop { display: flex !important; }
          .mobile-header { display: none !important; }
          .main-content { margin-left: 260px !important; padding-top: 0 !important; }
        }
        @media (max-width: 1023px) {
          .sidebar-desktop { display: none !important; }
          .mobile-header { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

export default CrmLayout;
