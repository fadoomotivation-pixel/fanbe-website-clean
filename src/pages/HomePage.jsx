import React from "react";

const HomePage = () => {
  return (
    <div className="bg-black text-white min-h-screen">

      {/* HERO */}
      <section className="flex flex-col items-center justify-center h-screen text-center px-6 bg-gradient-to-r from-black via-black to-amber-900">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          वृंदावन में प्रीमियम गेटेड प्लॉट्स
        </h1>

        <p className="text-lg text-gray-300 mb-8">
          Luxury Gated Developments | 0% EMI | Transparent Registry
        </p>

        <button className="bg-amber-500 text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
          अभी बुक करें
        </button>
      </section>

      {/* TRUST SECTION */}
      <section className="py-16 bg-gray-900 text-center">
        <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto px-6">
          <div>
            <h3 className="text-3xl font-bold text-amber-400">10,000+</h3>
            <p className="text-gray-400">खुशहाल परिवार</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-amber-400">0% EMI</h3>
            <p className="text-gray-400">Flexible Payment</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-amber-400">100%</h3>
            <p className="text-gray-400">Legal Transparency</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-amber-400">Prime</h3>
            <p className="text-gray-400">Vrindavan Location</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
