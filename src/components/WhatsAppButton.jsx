import React from 'react';
import { companyInfo } from '../data/projectsData';

function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/91${companyInfo.phone}?text=Hi,%20I'm%20interested%20in%20Fanbe%20Group%20properties.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '25px',
        right: '25px',
        width: '60px',
        height: '60px',
        background: '#25D366',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '30px',
        boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
        zIndex: 1000,
        textDecoration: 'none',
        transition: 'transform 0.3s, box-shadow 0.3s',
        animation: 'pulse 2s infinite'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 6px 30px rgba(37,211,102,0.5)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.4)';
      }}
    >
      💬
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </a>
  );
}

export default WhatsAppButton;
