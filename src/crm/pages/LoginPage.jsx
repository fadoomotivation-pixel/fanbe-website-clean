import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const colors = {
  navy: '#1a3a5c',
  navyDark: '#0f2439',
  teal: '#4a7c8a',
  gold: '#c9a962',
  goldLight: '#d4bc7d'
};

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = login(email, password);
    
    if (result.success) {
      navigate('/crm/dashboard');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.navyDark} 0%, ${colors.navy} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '24px',
        padding: '48px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '70px',
            height: '70px',
            background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.navyDark} 100%)`,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 20px rgba(26,58,92,0.3)'
          }}>
            <span style={{ color: colors.gold, fontWeight: 'bold', fontSize: '28px', fontFamily: "'Playfair Display', serif" }}>FG</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: colors.navy, marginBottom: '8px' }}>
            Fanbe CRM
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Sign in to manage leads & customers</p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: colors.navy }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@fanbegroup.com"
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '10px',
                border: '2px solid #e2e8f0',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = colors.gold}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: colors.navy }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '10px',
                border: '2px solid #e2e8f0',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = colors.gold}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
              color: colors.navyDark,
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.2s'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div style={{
          marginTop: '32px',
          padding: '20px',
          background: '#f8fafc',
          borderRadius: '12px'
        }}>
          <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px', fontWeight: '600' }}>
            Demo Credentials:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>Admin:</span>
              <span style={{ fontFamily: 'monospace' }}>admin@fanbegroup.com / admin123</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>Sub-Admin:</span>
              <span style={{ fontFamily: 'monospace' }}>subadmin@fanbegroup.com / subadmin123</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>Employee:</span>
              <span style={{ fontFamily: 'monospace' }}>employee@fanbegroup.com / employee123</span>
            </div>
          </div>
        </div>

        {/* Back to Website */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a href="/" style={{ color: colors.teal, fontSize: '14px', textDecoration: 'none' }}>
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
