import React, { useState } from "react";
import { Play, Shield, MapPin, Landmark, TrendingUp } from "lucide-react";

const HomePage = () => {
  const [amount, setAmount] = useState(1000000);

  const emi = Math.round(amount / 40);

  return (
    <div className="bg-black text-white overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="relative h-screen flex items-center justify-center text-center px-6">

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-amber-900/40" />

        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/vrindavan-flyover.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold font-serif leading-tight mb-6">
            वृंदावन में प्रीमियम गेटेड प्लॉट्स
            <br />
            <span className="text-amber-400">
              जहां निवेश बनता है भविष्य की संपत्ति
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10">
            Luxury Gated Developments in Vrindavan |
            0% EMI | Transparent Registry | Prime Locations
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-10 py-4 rounded-full font-semibold text-lg hover:scale-105 transition">
              अभी बुक करें <Play className="inline ml-2 w-5" />
            </button>

            <button className="border border-amber-400 px-10 py-4 rounded-full text-amber-400 hover:bg-amber-400 hover:text-black transition">
              वीडियो टूर | Video Tour
            </button>
          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="bg-gradient-to-r from-black via-gray-900 to-black py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center px-6">

          <div>
            <h3 className="text-3xl font-bold text-amber-400">10,000+</h3>
            <p className="text-gray-400">खुशहाल परिवार</p>
          </
