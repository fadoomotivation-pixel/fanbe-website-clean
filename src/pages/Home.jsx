import React from 'react';
import { Link } from 'react-router-dom';

const C = { navy: '#1a3a5c', gold: '#c9a962' };

export default function Home() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #0f2439 100%)`, padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
            <div style={{ width: 50, height: 50, background: '#fff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: C.navy, fontWeight: 'bold', fontSize: 20, fontFamily: "'Playfair Display', serif" }}>FG</span>
            </div>
            <span style={{ color: '#fff', fontSize: 22, fontWeight: 700 }}>Fanbe Group</span>
          </div>
          
          <h1 style={{ color: '#fff', fontSize: 32, fontWeight: 700, marginBottom: 16, fontFamily: "'Playfair Display', serif" }}>
            Premium Plots in Vrindavan, Barsana & Kosi Kalan
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
            12+ Years of Trust | 20+ Projects | 5000+ Happy Customers
          </p>
          
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:9319169463" style={{ background: C.gold, color: '#0f2439', padding: '14px 28px', borderRadius: 12, textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              📞 Call Now
            </a>
            <a href="https://wa.me/919319169463" style={{ background: '#25D366', color: '#fff', padding: '14px 28px', borderRadius: 12, textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div style={{ padding: '48px 20px', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: C.navy, marginBottom: 24, textAlign: 'center' }}>Our Projects</h2>
        <div style={{ display: 'grid', gap: 16 }}>
          {[
            { name: 'Brijvatika', location: 'Vrindavan', price: '₹15,525/sq.yd' },
            { name: 'Maa Semri Vatika', location: 'Vrindavan', price: '₹15,525/sq.yd' },
            { name: 'Shree Gokul Vatika', location: 'Chatta', price: '₹10,025/sq.yd' },
            { name: 'Shree Jagannath Dham', location: 'Kosi Kalan', price: '₹8,025/sq.yd' },
            { name: 'Khatu Shyam Enclave', location: 'Sikar, Rajasthan', price: '₹15,525/sq.yd' },
            { name: 'Kunj Bihari Enclave', location: 'Barsana', price: '₹7,525/sq.yd' }
          ].map(p => (
            <div key={p.name} style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, color: C.navy, fontSize: 16 }}>{p.name}</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>{p.location}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: C.gold, fontWeight: 600 }}>{p.price}</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Starting Price</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CRM Link */}
      <div style={{ padding: '32px 20px', background: '#f8fafc', textAlign: 'center' }}>
        <Link to="/crm" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.navy, color: '#fff', padding: '12px 24px', borderRadius: 10, textDecoration: 'none', fontWeight: 600 }}>
          🔐 Employee Login (CRM)
        </Link>
      </div>

      {/* Footer */}
      <footer style={{ background: C.navy, padding: '32px 20px', textAlign: 'center' }}>
        <div style={{ color: '#fff', fontWeight: 600, marginBottom: 8 }}>Fanbe Group</div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 16 }}>
          Office: Huda Market, Ballabgarh, Faridabad
        </div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>
          © 2026 Fanbe Group. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
