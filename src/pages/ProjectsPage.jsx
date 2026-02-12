import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { projectsData } from '../data/projectsData';

const colors = {
  navy: '#1a3a5c',
  navyDark: '#0f2439',
  teal: '#4a7c8a',
  gold: '#c9a962',
  goldLight: '#d4bc7d'
};

function ProjectsPage() {
  const { lang, t } = useLanguage();
  const formatCurrency = (amount) => '₹' + amount.toLocaleString('en-IN');

  return (
    <div style={{ paddingTop: '70px' }}>
      {/* Header */}
      <section style={{
        padding: '60px 20px',
        background: `linear-gradient(135deg, ${colors.navyDark} 0%, ${colors.navy} 100%)`,
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(32px, 6vw, 48px)',
          fontWeight: 'bold',
          color: '#fff',
          marginBottom: '16px',
          fontFamily: "'Playfair Display', serif"
        }}>
          {t.projects.title}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px' }}>{t.projects.subtitle}</p>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: '80px 20px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
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
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img
                    src={project.image}
                    alt={lang === 'en' ? project.name : project.nameHi}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                    padding: '12px 18px',
                    borderRadius: '14px'
                  }}>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{t.projects.emiFrom}</div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: colors.navy }}>
                      {formatCurrency(project.emiTable[0].emi)}<span style={{ fontSize: '12px', fontWeight: 'normal' }}>/mo</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '14px', marginBottom: '12px' }}>
                    📍 {lang === 'en' ? `${project.location}, ${project.state}` : `${project.locationHi}, ${project.stateHi}`}
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: colors.navy,
                    marginBottom: '12px',
                    fontFamily: "'Playfair Display', serif"
                  }}>
                    {lang === 'en' ? project.name : project.nameHi}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
                    {lang === 'en' ? project.description.slice(0, 100) : project.descriptionHi.slice(0, 100)}...
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '20px'
                  }}>
                    {project.plotSizes.slice(0, 3).map(size => (
                      <span key={size} style={{
                        background: '#f1f5f9',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: colors.navy
                      }}>
                        {size} {lang === 'en' ? 'sq.yd' : 'वर्ग गज'}
                      </span>
                    ))}
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '20px',
                    borderTop: '1px solid #e2e8f0'
                  }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{t.projects.startingFrom}</div>
                      <div style={{ fontSize: '22px', fontWeight: 'bold', color: colors.teal }}>
                        {formatCurrency(project.ratePerSqYd)}<span style={{ fontSize: '13px', fontWeight: 'normal', color: '#64748b' }}>{t.projects.perSqYd}</span>
                      </div>
                    </div>
                    <span style={{
                      background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
                      color: colors.navyDark,
                      padding: '12px 24px',
                      borderRadius: '25px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      {t.projects.viewDetails} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectsPage;
