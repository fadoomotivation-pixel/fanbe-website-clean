import React, { useState } from 'react';
import { Play, Calendar, Shield, MapPin, Phone } from 'lucide-react';

const HomePage = () => {
  const [lang, setLang] = useState('hi'); // 'en' or 'hi'

  const t = lang === 'hi' ? {
    heroTitle: "गेटेड सोसाइटी में अपना सपनों का प्लॉट",
    heroSub: "0% EMI | RERA अप्रूvd | तत्काल कब्जा",
    cta: "अभी बुक करें",
    projects: "हमारे प्रोजेक्ट्स",
    amenities: "विशेषताएं",
    emi: "EMI कैलकुलेटर",
    trusted: "10,000+ खुशहाल परिवार"
  } : {
    heroTitle: "Own Your Dream Plot in Gated Society",
    heroSub: "0% EMI | RERA Approved | Ready Possession",
    cta: "Book Now",
    projects: "Our Projects",
    amenities: "Amenities",
    emi: "EMI Calculator",
    trusted: "10,000+ Happy Families"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50 overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-screen bg-black overflow-hidden">
        <video autoPlay muted loop className="w-full h-full object-cover opacity-80" poster="/hero-vrindavan.jpg">
          <source src="/vrindavan-flyover.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-amber-500/20" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
          <div className="w-full max-w-4xl mx-auto">
            <button onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')} className="absolute top-6 right-6 bg-gold-500 text-black px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {lang === 'hi' ? 'EN' : 'हिं'}
            </button>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl font-serif tracking-tight">
              {t.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl mb-12 opacity-95 max-w-2xl mx-auto leading-relaxed">
              {t.heroSub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#projects" className="group bg-gradient-to-r from-amber-500 to-gold-600 text-black px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-gold-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-3">
                {t.cta} <Play className="w-5 h-5 group-hover:rotate-12" />
              </a>
              <a href="#contact" className="border-2 border-white/50 text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-white hover:text-black transition-all duration-300">
                वीडियो टूर | Video Tour
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">
          <div className="text-3xl md:text-4xl font-bold text-indigo-900">{t.trusted}</div>
          <div className="text-3xl md:text-4xl font-bold text-green-600">0% EMI</div>
          <div className="text-3xl md:text-4xl font-bold text-blue-600">RERA Approved</div>
          <div className="text-3xl md:text-4xl font-bold text-amber-600">Ready Possession</div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 bg-gradient-to-b from-amber-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-gray-800 font-serif">{t.projects}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Project Cards */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4">
              <img src="/brijvatika.jpg" alt="Brijvatika" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Brijvatika</h3>
                <p className="text-gray-600 mb-4">Vrindavan | 100-200 sqm Plots</p>
                <div className="flex items-center gap-2 text-amber-500 mb-4">
                  <Shield className="w-5 h-5" /> <span>5-Star Security</span>
                </div>
                <a href="/projects" className="w-full block bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl text-center font-bold hover:from-indigo-700 transition-all">
                  विवरण देखें | View Details
                </a>
              </div>
            </div>
            {/* Repeat for 2 more projects */}
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section id="emi" className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">{t.emi}</h2>
          {/* Simple EMI form - expand with logic */}
          <div className="max-w-md mx-auto bg-gradient-to-r from-indigo-50 to-amber-50 p-8 rounded-3xl shadow-xl">
            <input type="range" min="500000" max="5000000" className="w-full h-3 bg-gray-200 rounded-lg" />
            <p className="text-3xl font-bold text-indigo-900 mt-4">₹25,000/माह</p>
            <button className="mt-6 w-full bg-amber-500 text-black py-4 rounded-2xl font-bold text-lg hover:bg-amber-600 transition">
              कैलकुलेट करें | Calculate
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
