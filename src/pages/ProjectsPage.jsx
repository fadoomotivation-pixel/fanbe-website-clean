import React from 'react';
import { Shield, MapPin, DollarSign } from 'lucide-react';

const ProjectsPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50 py-20 px-6">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-bold text-center mb-16 text-gray-800 font-serif">Our Projects</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <img src="/brijvatika.jpg" alt="Brijvatika" className="w-full h-48 object-cover rounded-2xl mb-6 group-hover:scale-105 transition-transform" />
          <h3 className="text-2xl font-bold mb-3">Brijvatika</h3>
          <div className="flex items-center gap-2 text-amber-500 mb-4">
            <MapPin className="w-5 h-5" /> Vrindavan
          </div>
          <p className="text-gray-600 mb-6">Gated plots | 0% EMI | RERA Approved</p>
          <a href="/projects/brijvatika" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black py-3 px-6 rounded-2xl font-bold text-center block hover:shadow-lg transition">
            View Details
          </a>
        </div>
        {/* Duplicate for Shree Gokul Vatika, etc. */}
      </div>
    </div>
  </div>
);

export default ProjectsPage;
