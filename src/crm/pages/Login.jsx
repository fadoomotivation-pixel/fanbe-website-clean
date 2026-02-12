import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const C = { navy: '#1a3a5c', gold: '#c9a962' };

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const res = login(email, pass);
    if (res.success) nav('/crm');
    else setErr(res.error);
  };

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${C.navy} 0%, #0f2439 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: '#fff', borderRadius: 24, padding: 32, width: '100%', maxWidth: 380 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 60, height: 60, background: C.navy, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <span style={{ color: C.gold, fontWeight: 'bold', fontSize: 24 }}>FG</span>
          </div>
          <h1 style={{ fontSize: 22, color: C.navy, marginBottom: 4 }}>Fanbe CRM</h1>
          <p style={{ color: '#64748b', fontSize: 13 }}>Sign in to continue</p>
        </div>

        {err && <div style={{ background: '#fef2f2', color: '#dc2626', padding: 12, borderRadius: 10, marginBottom: 16, fontSize: 14 }}>{err}</div>}

        <form onSubmit={submit}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required
            style={{ width: '100%', padding: 14, borderRadius: 12, border: '2px solid #e2e8f0', fontSize: 16, marginBottom: 12, boxSizing: 'border-box' }} />
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" required
            style={{ width: '100%', padding: 14, borderRadius: 12, border: '2px solid #e2e8f0', fontSize: 16, marginBottom: 20, boxSizing: 'border-box' }} />
          <button type="submit" style={{ width: '100%', padding: 16, background: C.gold, color: '#0f2439', borderRadius: 12, fontSize: 16, fontWeight: 600, border: 'none' }}>
            Sign In
          </button>
        </form>

        <div style={{ marginTop: 24, padding: 16, background: '#f8fafc', borderRadius: 12, fontSize: 11 }}>
          <div style={{ fontWeight: 600, marginBottom: 8, color: '#64748b' }}>Demo Logins:</div>
          <div style={{ color: '#475569' }}>admin@fanbegroup.com / admin123</div>
          <div style={{ color: '#475569' }}>ankita@fanbegroup.com / ankita123</div>
        </div>
      </div>
    </div>
  );
}
