import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { projectsData, companyStats, companyInfo } from '../data/projectsData';

const colors = {
  navy: '#1a3a5c',
  navyDark: '#0f2439',
  teal: '#4a7c8a',
  tealLight: '#5d9aab',
  gold: '#c9a962',
  goldLight: '#d4bc7d'
};

// Animated Counter Component
function Counter({ end, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);

  return <>{count.toLocaleString()}{suffix}</>;
}

function HomePage() {
  const { lang, t } = useLanguage();

  const formatCurrency = (amount) => '₹' + amount.toLocaleString('en-IN');

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${colors.navyDark} 0%, ${colors.navy} 50%, ${colors.navyDark} 100%)`,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 20px 60px'
      }}>
        {/* Background Decorations */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-150px',
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, rgba(201,169,98,0.15) 0%, transparent 70%)`,
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          left: '-100px',
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, rgba(74,124,138,0.15) 0%, transparent 70%)`,
          borderRadius: '50%'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 10 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '40px',
            alignItems: 'center'
          }} className="hero-grid">
            <div style={{ textAlign: 'center' }} className="hero-content">
              {/* Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '12px 24px',
                borderRadius: '50px',
                marginBottom: '30px'
              }}>
                <span style={{
                  width: '10px',
                  height: '10px',
                  background: colors.gold,
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }} />
                <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', fontWeight: '500' }}>
                  {t.hero.badge}
                </span>
              </div>

              {/* Title */}
              <h1 style={{
                fontSize: 'clamp(40px, 10vw, 72px)',
                fontWeight: 'bold',
                color: '#fff',
                lineHeight: '1.1',
                marginBottom: '24px',
                fontFamily: "'Playfair Display', serif"
              }}>
                {t.hero.title}<br />
                <span style={{
                  background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {t.hero.titleHighlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p style={{
                fontSize: '18px',
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '600px',
                margin: '0 auto 40px',
                lineHeight: '1.7'
              }}>
                {t.hero.subtitle}
              </p>

              {/* CTA Buttons */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                alignItems: 'center'
              }} className="hero-cta">
                <Link
                  to="/projects"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
                    color: colors.navyDark,
                    padding: '18px 40px',
                    borderRadius: '50px',
                    fontSize: '17px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    boxShadow: '0 8px 30px rgba(201,169,98,0.35)',
                    transition: 'all 0.3s'
                  }}
                >
                  {t.hero.cta} →
                </Link>
                <a
                  href={`tel:${companyInfo.phone}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: `2px solid rgba(201,169,98,0.5)`,
                    color: colors.gold,
                    padding: '16px 36px',
                    borderRadius: '50px',
                    fontSize: '16px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.3s'
                  }}
                >
                  📞 {t.hero.ctaCall}: {companyInfo.phone}
                </a>
              </div>

              {/* Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '20px',
                marginTop: '60px',
                maxWidth: '600px',
                margin: '60px auto 0'
              }}>
                {[
                  { val: companyStats.yearsExperience, suffix: '+', label: t.stats.years },
                  { val: companyStats.projectsDelivered, suffix: '+', label: t.stats.projects },
                  { val: companyStats.happyCustomers, suffix: '+', label: t.stats.customers },
                  { val: companyStats.cities, suffix: '', label: t.stats.cities }
                ].map((stat, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: 'clamp(28px, 5vw, 36px)',
                      fontWeight: 'bold',
                      color: '#fff',
                      fontFamily: "'Playfair Display', serif"
                    }}>
                      <Counter end={stat.val} suffix={stat.suffix} />
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 120" fill="#f8fafc" style={{ display: 'block', width: '100%' }}>
            <path d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,90 1440,90 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Featured Projects */}
      <section style={{ padding: '100px 20px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: 'bold',
              color: colors.navy,
              marginBottom: '16px',
              fontFamily: "'Playfair Display', serif"
            }}>
              {t.projects.title}
            </h2>
            <p style={{ color: '#64748b', fontSize: '17px', maxWidth: '600px', margin: '0 auto' }}>
              {t.projects.subtitle}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {projectsData.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                style={{
                  background: '#fff',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  display: 'block'
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={project.image}
                    alt={lang === 'en' ? project.name : project.nameHi}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s'
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: colors.gold,
                    color: colors.navyDark,
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {lang === 'en' ? project.tag : project.tagHi}
                  </span>
                  <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    background: 'rgba(255,255,255,0.95)',
                    padding: '10px 16px',
                    borderRadius: '14px',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>{t.projects.emiFrom}</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: colors.navy }}>
                      {formatCurrency(project.emiTable[0].emi)}<span style={{ fontSize: '11px', fontWeight: 'normal' }}>/mo</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '24px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#64748b',
                    fontSize: '13px',
                    marginBottom: '10px'
                  }}>
                    📍 {lang === 'en' ? `${project.location}, ${project.state}` : `${project.locationHi}, ${project.stateHi}`}
                  </div>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    color: colors.navy,
                    marginBottom: '16px',
                    fontFamily: "'Playfair Display', serif"
                  }}>
                    {lang === 'en' ? project.name : project.nameHi}
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid #e2e8f0'
                  }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{t.projects.startingFrom}</div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: colors.teal }}>
                        {formatCurrency(project.ratePerSqYd)}<span style={{ fontSize: '12px', fontWeight: 'normal', color: '#64748b' }}>{t.projects.perSqYd}</span>
                      </div>
                    </div>
                    <span style={{
                      color: colors.gold,
                      fontWeight: '600',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      {t.projects.viewDetails} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link
              to="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
                color: colors.navyDark,
                padding: '18px 40px',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(201,169,98,0.3)'
              }}
            >
              {t.projects.viewAll} →
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ padding: '100px 20px', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: 'bold',
              color: colors.navy,
              marginBottom: '16px',
              fontFamily: "'Playfair Display', serif"
            }}>
              {t.services.title}
            </h2>
            <p style={{ color: '#64748b', fontSize: '17px' }}>{t.services.subtitle}</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px'
          }}>
            {[
              { key: 'residential', icon: '🏠', bg: colors.navy },
              { key: 'farmhouse', icon: '🏡', bg: colors.teal },
              { key: 'commercial', icon: '🏢', bg: colors.gold },
              { key: 'agriculture', icon: '🌾', bg: '#16a34a' }
            ].map((service) => (
              <div
                key={service.key}
                style={{
                  background: '#f8fafc',
                  borderRadius: '24px',
                  padding: '40px 30px',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  border: '1px solid transparent'
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: service.bg,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  margin: '0 auto 20px',
                  boxShadow: `0 8px 20px ${service.bg}33`
                }}>
                  {service.icon}
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: colors.navy,
                  marginBottom: '12px'
                }}>
                  {t.services[service.key].title}
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                  {t.services[service.key].desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{
        padding: '100px 20px',
        background: `linear-gradient(135deg, ${colors.navyDark} 0%, ${colors.navy} 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, rgba(201,169,98,0.1) 0%, transparent 70%)`,
          borderRadius: '50%'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: '16px',
              fontFamily: "'Playfair Display', serif"
            }}>
              {t.why.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px' }}>{t.why.subtitle}</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            {t.why.reasons.map((reason, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '24px',
                  padding: '32px',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginBottom: '20px'
                }}>
                  ✓
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#fff',
                  marginBottom: '12px'
                }}>
                  {reason.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '100px 20px', background: '#fef3c7' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(26px, 5vw, 36px)',
            fontWeight: 'bold',
            color: colors.navy,
            marginBottom: '16px',
            fontFamily: "'Playfair Display', serif"
          }}>
            {t.cta.title}
          </h2>
          <p style={{ color: '#64748b', fontSize: '17px', marginBottom: '40px' }}>{t.cta.subtitle}</p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center'
          }}>
            <a
              href={`tel:${companyInfo.phone}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                width: '100%',
                maxWidth: '320px',
                background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
                color: colors.navyDark,
                padding: '18px 32px',
                borderRadius: '50px',
                fontSize: '17px',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(201,169,98,0.35)'
              }}
            >
              📞 {t.cta.phone}: {companyInfo.phone}
            </a>
            <a
              href={`https://wa.me/91${companyInfo.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                width: '100%',
                maxWidth: '320px',
                background: '#25D366',
                color: '#fff',
                padding: '18px 32px',
                borderRadius: '50px',
                fontSize: '17px',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(37,211,102,0.35)'
              }}
            >
              💬 {t.cta.whatsapp}
            </a>
          </div>
        </div>
      </section>

      {/* Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr 1fr; }
          .hero-content { text-align: left; }
          .hero-cta { flex-direction: row; justify-content: flex-start; }
        }
      `}</style>
    </div>
  );
}

export default HomePage;
