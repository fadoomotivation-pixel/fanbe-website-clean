import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectsData, companyInfo } from '../data/projectsData';

const colors = {
  navy: '#1a3a5c',
  navyDark: '#0f2439',
  teal: '#4a7c8a',
  gold: '#c9a962',
  goldLight: '#d4bc7d'
};

function ContactPage() {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project: '',
    plotSize: '',
    message: '',
    whatsappOptIn: true
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send to WhatsApp
    const msg = `New Inquiry from ${formData.name}%0A%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0AProject: ${formData.project}%0APlot Size: ${formData.plotSize}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/91${companyInfo.phone}?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit'
  };

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
          {t.contact.title}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px' }}>{t.contact.subtitle}</p>
      </section>

      {/* Content */}
      <section style={{ padding: '80px 20px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px'
          }}>
            {/* Contact Info */}
            <div>
              <div style={{
                background: '#fff',
                borderRadius: '24px',
                padding: '40px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                marginBottom: '24px'
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: colors.navy, marginBottom: '32px' }}>
                  {t.contact.info.phone}
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <a href={`tel:${companyInfo.phone}`} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    textDecoration: 'none',
                    color: colors.navy
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}>📞</div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#64748b' }}>{t.contact.info.phone}</div>
                      <div style={{ fontSize: '18px', fontWeight: '600' }}>{companyInfo.phone}</div>
                    </div>
                  </a>

                  <a href={`mailto:${companyInfo.email}`} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    textDecoration: 'none',
                    color: colors.navy
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      background: `linear-gradient(135deg, ${colors.teal} 0%, ${colors.navy} 100%)`,
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}>✉️</div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#64748b' }}>{t.contact.info.email}</div>
                      <div style={{ fontSize: '18px', fontWeight: '600' }}>{companyInfo.email}</div>
                    </div>
                  </a>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      background: `linear-gradient(135deg, ${colors.navyDark} 0%, ${colors.navy} 100%)`,
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      flexShrink: 0
                    }}>📍</div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#64748b' }}>{t.contact.info.address}</div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: colors.navy, lineHeight: '1.5' }}>
                        {lang === 'en' ? companyInfo.address : companyInfo.addressHi}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      background: '#25D366',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}>🕐</div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#64748b' }}>{t.contact.info.hours}</div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: colors.navy }}>
                        {t.contact.info.hoursValue}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a
                  href={`https://wa.me/91${companyInfo.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    background: '#25D366',
                    color: '#fff',
                    padding: '18px 24px',
                    borderRadius: '14px',
                    fontSize: '17px',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}
                >
                  💬 {t.cta.whatsapp}
                </a>
                <a
                  href={`tel:${companyInfo.phone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
                    color: colors.navyDark,
                    padding: '18px 24px',
                    borderRadius: '14px',
                    fontSize: '17px',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}
                >
                  📞 {t.cta.phone}
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{
              background: '#fff',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
            }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: colors.navy, marginBottom: '12px' }}>
                    {lang === 'en' ? 'Thank You!' : 'धन्यवाद!'}
                  </h3>
                  <p style={{ color: '#64748b' }}>
                    {lang === 'en' ? 'We will contact you soon.' : 'हम जल्द ही आपसे संपर्क करेंगे।'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: colors.navy, marginBottom: '32px' }}>
                    {lang === 'en' ? 'Send Inquiry' : 'पूछताछ भेजें'}
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: colors.navy }}>
                        {t.contact.form.name} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        style={inputStyle}
                        placeholder={t.contact.form.name}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: colors.navy }}>
                        {t.contact.form.phone} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        style={inputStyle}
                        placeholder="9876543210"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: colors.navy }}>
                        {t.contact.form.email}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        style={inputStyle}
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: colors.navy }}>
                        {t.contact.form.project}
                      </label>
                      <select
                        value={formData.project}
                        onChange={e => setFormData({...formData, project: e.target.value})}
                        style={{...inputStyle, cursor: 'pointer'}}
                      >
                        <option value="">{lang === 'en' ? 'Select Project' : 'प्रोजेक्ट चुनें'}</option>
                        {projectsData.map(p => (
                          <option key={p.id} value={lang === 'en' ? p.name : p.nameHi}>
                            {lang === 'en' ? p.name : p.nameHi}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: colors.navy }}>
                        {t.contact.form.plotSize}
                      </label>
                      <select
                        value={formData.plotSize}
                        onChange={e => setFormData({...formData, plotSize: e.target.value})}
                        style={{...inputStyle, cursor: 'pointer'}}
                      >
                        <option value="">{lang === 'en' ? 'Select Size' : 'साइज चुनें'}</option>
                        {[50, 100, 150, 200, 250].map(size => (
                          <option key={size} value={`${size} sq.yd`}>{size} {lang === 'en' ? 'sq.yd' : 'वर्ग गज'}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: colors.navy }}>
                        {t.contact.form.message}
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        style={{...inputStyle, minHeight: '100px', resize: 'vertical'}}
                        placeholder={t.contact.form.message}
                      />
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formData.whatsappOptIn}
                        onChange={e => setFormData({...formData, whatsappOptIn: e.target.checked})}
                        style={{ width: '20px', height: '20px', accentColor: colors.gold }}
                      />
                      <span style={{ fontSize: '14px', color: '#64748b' }}>{t.contact.form.whatsappOptIn}</span>
                    </label>

                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '18px 24px',
                        background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
                        color: colors.navyDark,
                        borderRadius: '14px',
                        fontSize: '17px',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: '8px'
                      }}
                    >
                      {t.contact.form.submit} →
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
