import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2'; // npm i react-chartjs-2 chart.js
import { DollarSign, Users, TrendingUp, MapPin } from 'lucide-react';
import { useRole } from '../context/AuthContext';

const InvestorDashboard = () => {
  const role = useRole();
  const [roiInput, setRoiInput] = useState({ investment: 1000000, years: 5 });

  // Sample data (replace with API)
  const roiData = {
    labels: ['Y1', 'Y2', 'Y3', 'Y4', 'Y5'],
    datasets: [{ label: 'ROI Projection (Brijvatika)', data: [1000000, 1150000, 1322500, 1520875, 1749006], borderColor: '#F59E0B' }]
  };

  const handleRoiCalc = () => {
    const projected = roiInput.investment * Math.pow(1.2, roiInput.years); // 20% annual
    return projected.toLocaleString('en-IN');
  };

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white p-6 rounded-2xl shadow-xl">
          <DollarSign className="w-12 h-12 mb-4" />
          <h3 className="text-2xl font-bold">Projected ROI</h3>
          <p className="text-3xl font-black">₹{handleRoiCalc()}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white p-6 rounded-2xl shadow-xl">
          <Users className="w-12 h-12 mb-4" />
          <h3 className="text-2xl font-bold">Active Investors</h3>
          <p className="text-3xl font-black">247</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-xl">
          <TrendingUp className="w-12 h-12 mb-4" />
          <h3 className="text-2xl font-bold">{role.toUpperCase()} Returns</h3>
          <p className="text-3xl font-black">22.5%</p>
        </div>
      </div>

      {/* ROI Calculator */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6">Investor ROI Calculator</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <input type="number" placeholder="Investment (₹)" value={roiInput.investment} onChange={e => setRoiInput({...roiInput, investment: +e.target.value})} className="p-4 border-2 border-gray-200 rounded-xl text-2xl font-bold text-right" />
          <input type="number" placeholder="Years" value={roiInput.years} onChange={e => setRoiInput({...roiInput, years: +e.target.value})} className="p-4 border-2 border-gray-200 rounded-xl text-2xl font-bold text-right" />
          <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-black p-4 rounded-xl text-2xl font-bold shadow-lg hover:shadow-xl">Calculate</button>
        </div>
        <Line data={roiData} options={{ responsive: true }} />
      </div>

      {/* Role-Specific Sections */}
      {role === 'admin' && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold mb-4">Admin: Manage Users</h3>
          {/* User table/actions */}
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold">Add Investor</button>
        </div>
      )}
      {role === 'subadmin' && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold mb-4">Subadmin: Project Pipeline</h3>
          <Bar data={{ labels: ['Q1', 'Q2'], datasets: [{ label: 'Plots Sold', data: [150, 220] }] }} />
        </div>
      )}
      {role === 'employee' && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold mb-4">Employee: My Leads ROI</h3>
          <p>Your personal investor leads: 12 | Projected: ₹48L</p>
        </div>
      )}

      {/* 3D Project Viewer Placeholder */}
      <div className="bg-gradient-to-br from-gray-900 to-black text-white p-12 rounded-3xl text-center">
        <MapPin className="w-24 h-24 mx-auto mb-8 opacity-50" />
        <h3 className="text-4xl font-bold mb-4">Brijvatika 3D Tour</h3>
        <p>Embed Three.js viewer here for investor flyovers</p>
        <button className="mt-8 bg-amber-500 text-black px-12 py-4 rounded-2xl font-bold text-xl">Launch Tour</button>
      </div>
    </div>
  );
};

export default InvestorDashboard;
