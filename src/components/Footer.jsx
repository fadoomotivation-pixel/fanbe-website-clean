import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { companyInfo, projectsData } from '../data/projectsData';

const colors = {
  navy: '#1a3a5c',
  navyDark: '#0f2439',
  teal: '#4a7c8a',
  gold: '#c9a962'
};

function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer style={{ background: colors.navyDark, padding: '60px 20px 30px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: '#fff',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: colors.navy, fontWeight: 'bold', fontSize: '20px', fontFamily: "'Playfair Display', serif" }}>FG</span>
              </div>
              <div>
                <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '18px', fontFamily: "'Playfair Display', serif" }}>FANBE GROUP</div>
                <div style={{ color: colors.gold, fontSize: '12px' }}>{t.footer.tagline}</div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: '1.7' }}>
              {t.footer.about}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: '600', marginBottom: '20px', fontSize: '16px' }}>{t.footer.quickLinks}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>{t.nav.home}</Link>
              <Link to="/projects" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>{t.nav.projects}</Link>
              <Link to="/about" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>{t.nav.about}</Link>
              <Link to="/contact" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>{t.nav.contact}</Link>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: '600', marginBottom: '20px', fontSize: '16px' }}>{t.footer.projects}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {projectsData.slice(0, 4).map(project => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}
                >
                  {lang === 'en' ? project.name : project.nameHi}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: '600', marginBottom: '20px', fontSize: '16px' }}>{t.footer.contact}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
              <a href={`tel:${companyInfo.phone}`} style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>📞</span> {companyInfo.phone}
              </a>
              <a href={`mailto:${companyInfo.email}`} style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>✉️</span> {companyInfo.email}
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>📍</span>
                <span>{lang === 'en' ? companyInfo.address : companyInfo.addressHi}</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              {['📘', '📸', '📺'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    textDecoration: 'none',
                    transition: 'background 0.2s'
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '25px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          textAlign: 'center'
        }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>{t.footer.rights}</p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>{t.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
