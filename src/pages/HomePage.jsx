import React from "react";
import { MapPin, Shield, Building2, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-white text-gray-800">

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-indigo-900 to-black text-white px-6 text-center">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Developing Structured Real Estate Assets
            <br />
            <span className="text-amber-400">
              Across North India
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10">
            Transparent Registry • Gated Township Planning • Flexible EMI Models • Long-Term Value Creation
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/projects"
              className="bg-amber-400 text-black font-semibold px-8 py-4 rounded-full hover:bg-amber-300 transition"
            >
              View Developments
            </a>

            <a
              href="/contact"
              className="border border-amber-400 text-amber-400 px-8 py-4 rounded-full hover:bg-amber-400 hover:text-black transition"
            >
              Investor Enquiry
            </a>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 text-center px-6">
          <div>
            <h2 className="text-3xl font-bold text-indigo-900">25+</h2>
            <p className="text-gray-500 mt-2">Developments</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-indigo-900">10,000+</h2>
            <p className="text-gray-500 mt-2">Plot Owners</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-indigo-900">5+</h2>
            <p className="text-gray-500 mt-2">Strategic Locations</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-indigo-900">100%</h2>
            <p className="text-gray-500 mt-2">Registry Support</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-indigo-900">Flexible</h2>
            <p className="text-gray-500 mt-2">EMI Structures</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-indigo-900 mb-6">
            About Fanbe Group
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Fanbe Group is a structured real estate development company focused on plotted
            townships across Vrindavan, Kosi, and Rajasthan. The company operates with
            transparent documentation processes, gated infrastructure planning, and
            structured payment models designed for long-term asset growth.
          </p>
        </div>
      </section>

    </div>
  );
}
