import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { projectsData, companyInfo } from '../data/projectsData';

const colors = {
  navy: '#1a3a5c',
  navyDark: '#0f2439',
  teal: '#4a7c8a',
  gold: '#c9a962',
  goldLight: '#d4bc7d'
};

function ProjectDetail() {
  const { id } = useParams();
  const { lang, t } = useLanguage();
  const [selectedSize, setSelectedSize] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return (
      <div style={{ paddingTop: '100px', textAlign: 'center', padding: '100px 20px' }}>
        <h1 style={{ fontSize: '24px', color: colors.navy }}>Project not found</h1>
        <Link to="/projects" style={{ color: colors.gold }}>← Back to Projects</Link>
      </div>
    );
  }

  const formatCurrency = (amount) => '₹' + amount.toLocaleString('en-IN');
  const selectedPlan = project.emiTable[selectedSize];

  return (
    <div style={{ paddingTop: '70px' }}>
      {/* Hero Image */}
      <section style={{ position: 'relative', height: '50vh', minHeight: '400px' }}>
        <img
          src={project.gallery[activeImage]}
          alt={lang === 'en' ? project.name : project.nameHi}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '20px',
          right: '20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <span style={{
            background: colors.gold,
            color: colors.navyDark,
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: '600'
          }}>
            {lang === 'en' ? project.tag : project.tagHi}
          </span>
          <h1 style={{
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: 'bold',
            color: '#fff',
            marginTop: '16px',
            fontFamily: "'Playfair Display', serif"
          }}>
            {lang === 'en' ? project.name : project.nameHi}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', marginTop: '8px' }}>
            📍 {lang === 'en' ? `${project.location}, ${project.state}` : `${project.locationHi}, ${project.stateHi}`}
          </p>
        </div>
      </section>

      {/* Gallery Thumbnails */}
      {project.gallery.length > 1 && (
        <div style={{
          display: 'flex',
          gap: '10px',
          padding: '20px',
          background: '#fff',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {project.gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              style={{
                width: '80px',
                height: '60px',
                borderRadius: '10px',
                overflow: 'hidden',
                border: activeImage === i ? `3px solid ${colors.gold}` : '3px solid transparent',
                padding: 0,
                cursor: 'pointer'
              }}
            >
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <section style={{ padding: '60px 20px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '40px'
          }} className="detail-grid">
            {/* Left Column - Info */}
            <div>
              {/* Description */}
              <div style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '32px',
                marginBottom: '24px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
              }}>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: colors.navy, marginBottom: '16px' }}>
                  {lang === 'en' ? 'About This Project' : 'इस प्रोजेक्ट के बारे में'}
                </h2>
                <p style={{ color: '#64748b', lineHeight: '1.8', fontSize: '15px' }}>
                  {lang === 'en' ? project.description : project.descriptionHi}
                </p>
              </div>

              {/* Features */}
              <div style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '32px',
                marginBottom: '24px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
              }}>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: colors.navy, marginBottom: '20px' }}>
                  {t.projects.features}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {(lang === 'en' ? project.features : project.featuresHi).map((feature, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      background: '#f8fafc',
                      borderRadius: '12px'
                    }}>
                      <span style={{ color: colors.gold, fontSize: '18px' }}>✓</span>
                      <span style={{ color: colors.navy, fontSize: '14px' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '32px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
              }}>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: colors.navy, marginBottom: '20px' }}>
                  {t.projects.amenities}
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {project.amenities.map((amenity, i) => (
                    <span key={i} style={{
                      padding: '10px 18px',
                      background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.navyDark} 100%)`,
                      color: '#fff',
                      borderRadius: '25px',
                      fontSize: '13px'
                    }}>
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - EMI Calculator */}
            <div>
              <div style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                position: 'sticky',
                top: '90px'
              }}>
                <h2 style={{
                  fontSize: '22px',
                  fontWeight: 'bold',
                  color: colors.navy,
                  marginBottom: '8px',
                  fontFamily: "'Playfair Display', serif"
                }}>
                  {t.projects.emiCalculator}
                </h2>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
                  {t.projects.selectPlotSize}
                </p>

                {/* Plot Size Selector */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                  {project.plotSizes.map((size, i) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(i)}
                      style={{
                        padding: '12px 20px',
                        borderRadius: '12px',
                        border: selectedSize === i ? 'none' : '2px solid #e2e8f0',
                        background: selectedSize === i ? `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)` : '#fff',
                        color: selectedSize === i ? colors.navyDark : colors.navy,
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {size} {lang === 'en' ? 'sq.yd' : 'वर्ग गज'}
                    </button>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '16px',
                  padding: '24px',
                  marginBottom: '24px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ color: '#64748b' }}>{t.projects.totalPrice}</span>
                    <span style={{ fontWeight: 'bold', color: colors.navy, fontSize: '18px' }}>
                      {formatCurrency(selectedPlan.total)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ color: '#64748b' }}>{t.projects.bookingAmount} ({project.bookingPercent}%)</span>
                    <span style={{ fontWeight: 'bold', color: colors.teal, fontSize: '18px' }}>
                      {formatCurrency(selectedPlan.booking)}
                    </span>
                  </div>
                  <div style={{
                    borderTop: '2px dashed #e2e8f0',
                    paddingTop: '16px',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ color: '#64748b' }}>{t.projects.emiTenure}</span>
                    <span style={{ fontWeight: 'bold', color: colors.navy }}>
                      {project.emiMonths} {t.projects.months}
                    </span>
                  </div>
                </div>

                {/* EMI Amount */}
                <div style={{
                  background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.navyDark} 100%)`,
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  marginBottom: '24px'
                }}>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '8px' }}>
                    {t.projects.emiFrom}
                  </div>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', color: colors.gold, fontFamily: "'Playfair Display', serif" }}>
                    {formatCurrency(selectedPlan.emi)}
                    <span style={{ fontSize: '16px', fontWeight: 'normal', color: 'rgba(255,255,255,0.7)' }}>{t.projects.perMonth}</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a
                    href={`https://wa.me/91${companyInfo.phone}?text=Hi, I'm interested in ${project.name} - ${project.plotSizes[selectedSize]} sq.yd plot`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      background: '#25D366',
                      color: '#fff',
                      padding: '16px 24px',
                      borderRadius: '14px',
                      fontSize: '16px',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}
                  >
                    💬 {t.projects.bookNow}
                  </a>
                  <a
                    href={`tel:${companyInfo.phone}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
                      color: colors.navyDark,
                      padding: '16px 24px',
                      borderRadius: '14px',
                      fontSize: '16px',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}
                  >
                    📞 {companyInfo.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 1024px) {
          .detail-grid { grid-template-columns: 1.2fr 1fr; }
        }
      `}</style>
    </div>
  );
}

export default ProjectDetail;
