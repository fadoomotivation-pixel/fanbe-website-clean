import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { companyInfo } from '../data/projectsData';

// Brand Colors
const colors = {
  navy: '#1a3a5c',
  navyDark: '#0f2439',
  teal: '#4a7c8a',
  gold: '#c9a962',
  goldLight: '#d4bc7d'
};

function Header() {
  const { lang, t, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/projects', label: t.nav.projects },
    { path: '/about', label: t.nav.about },
    { path: '/contact', label: t.nav.contact }
  ];

  const headerBg = scrolled || !isHome
    ? 'rgba(255,255,255,0.98)'
    : 'transparent';

  const textColor = scrolled || !isHome ? colors.navy : '#fff';

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: headerBg,
        backdropFilter: scrolled || !isHome ? 'blur(10px)' : 'none',
        boxShadow: scrolled || !isHome ? '0 2px 20px rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px'
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.navyDark} 100%)`,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(26,58,92,0.3)'
            }}>
              <span style={{ color: colors.gold, fontWeight: 'bold', fontSize: '20px', fontFamily: "'Playfair Display', serif" }}>FG</span>
            </div>
            <div>
              <div style={{
                fontWeight: 'bold',
                fontSize: '18px',
                color: textColor,
                fontFamily: "'Playfair Display', serif",
                letterSpacing: '0.5px'
              }}>FANBE GROUP</div>
              <div style={{ fontSize: '11px', color: colors.gold, marginTop: '-2px' }}>
                {lang === 'en' ? companyInfo.tagline : companyInfo.taglineHi}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '8px' }} className="desktop-nav">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: location.pathname === link.path ? colors.gold : textColor,
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  background: location.pathname === link.path
                    ? (scrolled || !isHome ? 'rgba(201,169,98,0.1)' : 'rgba(255,255,255,0.1)')
                    : 'transparent'
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '20px',
                border: 'none',
                background: scrolled || !isHome ? '#f1f5f9' : 'rgba(255,255,255,0.15)',
                color: scrolled || !isHome ? colors.navy : '#fff',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              🌐 {lang === 'en' ? 'हिंदी' : 'EN'}
            </button>

            {/* Call Button - Desktop */}
            <a
              href={`tel:${companyInfo.phone}`}
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '25px',
                background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
                color: colors.navyDark,
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(201,169,98,0.3)',
                transition: 'all 0.2s'
              }}
              className="desktop-call"
            >
              📞 {companyInfo.phone}
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                border: 'none',
                background: scrolled || !isHome ? '#f1f5f9' : 'rgba(255,255,255,0.15)',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '20px'
              }}
              className="mobile-menu-btn"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            position: 'absolute',
            top: '70px',
            left: 0,
            right: 0,
            background: '#fff',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }} className="mobile-menu">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: location.pathname === link.path ? colors.gold : colors.navy,
                  textDecoration: 'none',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: '500',
                  background: location.pathname === link.path ? 'rgba(201,169,98,0.1)' : 'transparent'
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${companyInfo.phone}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px 20px',
                borderRadius: '25px',
                background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
                color: colors.navyDark,
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                marginTop: '8px'
              }}
            >
              📞 {t.hero.ctaCall}: {companyInfo.phone}
            </a>
          </div>
        )}
      </header>

      {/* CSS for responsive behavior */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-call { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .desktop-call { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

export default Header;
