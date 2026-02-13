import React from "react";
import { Link } from "react-router-dom";
import { MapPin, IndianRupee, Clock, ShieldCheck } from "lucide-react";

const projects = [
  {
    slug: "brijvatika",
    name: "Brij Vatika (E Block)",
    location: "Vrindavan",
    rate: 15525,
    emiMonths: 40,
    tier: "Premium Township",
    highlight: "Gated Community | Near NH-2 | Instant Possession",
  },
  {
    slug: "maasemri",
    name: "Maa Semri Vatika",
    location: "Vrindavan",
    rate: 15525,
    emiMonths: 24,
    tier: "Premium Gated Township",
    highlight: "Temple Inside | 24/7 Security | Planned Development",
  },
  {
    slug: "gokul",
    name: "Shree Gokul Vatika",
    location: "Vrindavan",
    rate: 10025,
    emiMonths: 24,
    tier: "Mid Segment Investment",
    highlight: "Prime Connectivity | Gated Colony | Registry Available",
  },
  {
    slug: "jagannath",
    name: "Shree Jagannath Dham",
    location: "Kosi - Kamar Road",
    rate: 8025,
    emiMonths: 54,
    tier: "Affordable Investment",
    highlight: "Long EMI Plan | Budget Friendly | Growth Potential",
  },
  {
    slug: "kunjbihari",
    name: "Shree Kunj Bihari Enclave",
    location: "Kosi",
    rate: 7525,
    emiMonths: 60,
    tier: "Budget Township",
    highlight: "NH-2 Connectivity | Registry Plots | 0% Interest",
  },
  {
    slug: "khatushyam",
    name: "Khatu Shyam Ji Enclave",
    location: "Rajasthan",
    rate: 7525,
    emiMonths: 60,
    tier: "Spiritual Investment",
    highlight: "Temple Proximity | Park & Fountain | Secure Living",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-amber-50 py-20 px-6">

      {/* PAGE HEADER */}
      <div className="text-center max-w-4xl mx-auto mb-20">
        <h1 className="text-5xl md:text-6xl font-bold text-indigo-900 mb-6">
          Our Premium Plotted Developments
        </h1>
        <p className="text-lg text-gray-600">
          Explore 25+ successful developments across Vrindavan, Kosi & Rajasthan.
          Transparent registry, gated communities & flexible 0% interest EMI plans.
        </p>
      </div>

      {/* PROJECT GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {projects.map((project) => (
          <div
            key={project.slug}
            className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition duration-300"
          >
            {/* Tier Badge */}
            <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {project.tier}
            </span>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-3 text-gray-800">
              {project.name}
            </h2>

            {/* Location */}
            <div className="flex items-center text-gray-600 mb-3">
              <MapPin size={16} className="mr-2" />
              {project.location}
            </div>

            {/* Rate */}
            <div className="flex items-center text-indigo-800 font-semibold mb-2">
              <IndianRupee size={16} className="mr-2" />
              ₹{project.rate.toLocaleString()} / Sq. Yard
            </div>

            {/* EMI */}
            <div className="flex items-center text-green-700 mb-4">
              <Clock size={16} className="mr-2" />
              {project.emiMonths} Month Easy EMI Plan
            </div>

            {/* Highlight */}
            <p className="text-gray-500 text-sm mb-6">
              {project.highlight}
            </p>

            {/* Button */}
            <Link
              to={`/projects/${project.slug}`}
              className="block text-center bg-indigo-700 text-white py-3 rounded-xl font-semibold hover:bg-indigo-800 transition"
            >
              View Full Details
            </Link>
          </div>
        ))}

      </div>

      {/* FOOTER CTA */}
      <div className="text-center mt-24">
        <h3 className="text-3xl font-bold text-indigo-900 mb-4">
          Not Sure Which Project Fits You?
        </h3>
        <p className="text-gray-600 mb-8">
          Speak with our advisors to choose the right investment plan.
        </p>

        <Link
          to="/contact"
          className="bg-amber-500 text-black px-10 py-4 rounded-full font-bold hover:bg-amber-600 transition"
        >
          Get Free Consultation
        </Link>
      </div>

    </div>
  );
}
