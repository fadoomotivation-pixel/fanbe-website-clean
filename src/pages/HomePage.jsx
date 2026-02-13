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
          </div>

          <div>
            <h3 className="text-3xl font-bold text-amber-400">0% EMI</h3>
            <p className="text-gray-400">Flexible Payment Plans</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-amber-400">100%</h3>
            <p className="text-gray-400">Legal Transparency</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-amber-400">Prime</h3>
            <p className="text-gray-400">Vrindavan Locations</p>
          </div>

        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="py-24 bg-black px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16">
            Our Premium Developments
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            {/* Brijvatika */}
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-amber-500/20 transition">

              <img
                src="/brijvatika.jpg"
                alt="Brijvatika"
                className="h-60 w-full object-cover"
              />

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-amber-400">
                  Brijvatika (E Block)
                </h3>

                <p className="text-gray-400 mb-4">
                  ₹15,525 / Sq Yard | 40 Month EMI Plan
                </p>

                <button className="mt-4 border border-amber-400 px-6 py-2 rounded-full text-amber-400 hover:bg-amber-400 hover:text-black transition">
                  Explore Project →
                </button>
              </div>
            </div>

            {/* Maa Semri */}
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-amber-500/20 transition">

              <img
                src="/semri.jpg"
                alt="Semri Vatika"
                className="h-60 w-full object-cover"
              />

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-amber-400">
                  Maa Semri Vatika
                </h3>

                <p className="text-gray-400 mb-4">
                  ₹15,525 / Sq Yard | 24 Month EMI
                </p>

                <button className="mt-4 border border-amber-400 px-6 py-2 rounded-full text-amber-400 hover:bg-amber-400 hover:text-black transition">
                  Explore Project →
                </button>
              </div>
            </div>

            {/* Gokul */}
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-amber-500/20 transition">

              <img
                src="/gokul.jpg"
                alt="Gokul Vatika"
                className="h-60 w-full object-cover"
              />

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-amber-400">
                  Shree Gokul Vatika
                </h3>

                <p className="text-gray-400 mb-4">
                  ₹10,025 / Sq Yard | 24 EMI Plan
                </p>

                <button className="mt-4 border border-amber-400 px-6 py-2 rounded-full text-amber-400 hover:bg-amber-400 hover:text-black transition">
                  Explore Project →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= EMI CALCULATOR ================= */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900 text-center px-6">
        <h2 className="text-4xl font-serif font-bold mb-12">
          EMI Calculator
        </h2>

        <div className="max-w-xl mx-auto bg-gray-800 p-10 rounded-2xl shadow-lg">

          <input
            type="range"
            min="500000"
            max="5000000"
            step="50000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mb-6"
          />

          <h3 className="text-3xl font-bold text-amber-400 mb-4">
            ₹{emi.toLocaleString()} / month
          </h3>

          <p className="text-gray-400">
            Based on 40 Month Plan
          </p>
        </div>
      </section>

      {/* ================= WHY VRINDAVAN ================= */}
      <section className="py-24 bg-black px-6">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl font-serif font-bold mb-12">
            Why Invest in Vrindavan?
          </h2>

          <div className="grid md:grid-cols-3 gap-10 text-gray-400">

            <div>
              <Landmark className="mx-auto mb-4 text-amber-400" />
              Religious Capital of India
            </div>

            <div>
              <TrendingUp className="mx-auto mb-4 text-amber-400" />
              Rapid Land Appreciation
            </div>

            <div>
              <MapPin className="mx-auto mb-4 text-amber-400" />
              NH Connectivity & Tourism Growth
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
