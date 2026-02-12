import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { companyStats } from '../data/projectsData';

const colors = {
  navy: '#1a3a5c',
  navyDark: '#0f2439',
  teal: '#4a7c8a',
  gold: '#c9a962',
  goldLight: '#d4bc7d'
};

function AboutPage() {
  const { t } = useLanguage();

  return (
    <div style={{ paddingTop: '70px' }}>
      {/* Header */}
      <section style={{
        padding: '80px 20px',
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
          {t.about.title}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px' }}>{t.about.subtitle}</p>
      </section>

      {/* About Content */}
      <section style={{ padding: '80px 20px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '48px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            marginBottom: '40px'
          }}>
            <p style={{
              fontSize: '18px',
              color: '#64748b',
              lineHeight: '1.9',
              marginBottom: '32px'
            }}>
              {t.about.description}
            </p>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '20px',
              padding: '32px',
              background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.navyDark} 100%)`,
              borderRadius: '16px'
            }}>
              {[
                { val: companyStats.yearsExperience + '+', label: t.stats.years },
                { val: companyStats.projectsDelivered + '+', label: t.stats.projects },
                { val: companyStats.happyCustomers + '+', label: t.stats.customers },
                { val: companyStats.cities, label: t.stats.cities }
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: colors.gold, fontFamily: "'Playfair Display', serif" }}>
                    {stat.val}
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission & Vision */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '36px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                marginBottom: '20px'
              }}>
                🎯
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: colors.navy, marginBottom: '12px' }}>
                {t.about.mission}
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '15px' }}>
                {t.about.missionText}
              </p>
            </div>

            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '36px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: `linear-gradient(135deg, ${colors.teal} 0%, ${colors.navy} 100%)`,
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                marginBottom: '20px'
              }}>
                👁️
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: colors.navy, marginBottom: '12px' }}>
                {t.about.vision}
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '15px' }}>
                {t.about.visionText}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
