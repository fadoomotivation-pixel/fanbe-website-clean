// src/pages/HomePage.jsx
import React, { useState } from "react";
import { Play } from "lucide-react";

/*
  This HomePage is built to match the brochure content you uploaded.
  - Dark luxury (black + gold) theme
  - Founder / investor-first copy and sections
  - Project cards use brochure starting rates (see citations below)
  - Simple EMI calculator with 40-month default (matches many payment plans)
*/

const PROJECTS = [
  {
    id: "brijvatika",
    title: "Brijvatika (Vrindavan)",
    location: "Vrindavan",
    // price per (sq yard / unit) taken from Brijvatika brochure. See Brijvatika PPT.
    startingRate: 15525,
    unit: "per unit/yard",
    image: "/brijvatika.jpg",
    slug: "/projects/brijvatika",
    source: ":contentReference[oaicite:0]{index=0}"
  },
  {
    id: "semri",
    title: "Maa Semri Vatika",
    location: "Vrindavan (near Maa Semri Mandir)",
    startingRate: 15525,
    unit: "per unit/yard",
    image: "/semri.jpg",
    slug: "/projects/semri",
    source: ":contentReference[oaicite:1]{index=1}"
  },
  {
    id: "gokul",
    title: "Shree Gokul Vatika",
    location: "Chhata / Sahar area",
    startingRate: 10025,
    unit: "per unit/yard",
    image: "/gokul.jpg",
    slug: "/projects/gokul",
    source: ":contentReference[oaicite:2]{index=2}"
  },
  {
    id: "jagannath",
    title: "Shree Jagannath Dham",
    location: "Kosi / Jagannath Dham",
    startingRate: 8025,
    unit: "per unit/yard",
    image: "/jagannath.jpg",
    slug: "/projects/jagannath",
    source: ":contentReference[oaicite:3]{index=3}"
  },
  {
    id: "kunj",
    title: "Shree Kunj Bihari Enclave",
    location: "Kosi / Barsana corridor",
    // user mentioned Khatu Shyam & Kunj Bihari are same -> using same pricing source where available
    startingRate: 7525,
    unit: "per unit/yard",
    image: "/kunj.jpg",
    slug: "/projects/kunj-bihari",
    source: ":contentReference[oaicite:4]{index=4}"
  },
  {
    id: "khatu",
    title: "Khatu Shyam Enclave",
    location: "Khatu Shyam / Nearby (same configuration as Kunj Bihari)",
    startingRate: 7525,
    unit: "per unit/yard",
    image: "/khatu.jpg",
    slug: "/projects/khatu-shyam",
    note: "User indicated Khatu Shyam and Kunj Bihari should be treated same"
    // visual/source available in company ppt as well. See company PPT for project list.
    // citation for company overview:
    // :contentReference[oaicite:5]{index=5}
  }
];

export default function HomePage() {
  const [lang, setLang] = useState("hi");
  const [plotSize, setPlotSize] = useState(50); // default plot size (used for EMI quick calc)
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0].id);

  // find project object
  const project = PROJECTS.find((p) => p.id === selectedProject);

  // EMI calc: simple monthly EMI for N months (matches many brochure 24/40/54 month examples)
  // default months: choose 40 if brochure uses 40-month plan; fallback 40
  const months = 40;
  const totalPrice = Math.round((project.startingRate * plotSize));
  const monthlyEmi = Math.round(totalPrice / months);

  const t = lang === "hi"
    ? {
        heroTitleMain: "वृंदावन में प्रीमियम गेटेड प्लॉट्स",
        heroSub: "निवेश जो बढ़े — संरचित, पारदर्शी और लॉन्ग-टर्म फोकस",
        cta: "अभी बुक करें",
        investorHeading: "निवेश के लिए संरचित दृष्टिकोण"
      }
    : {
        heroTitleMain: "Luxury Gated Plots in Vrindavan",
        heroSub: "Structured investments — Transparent ownership & long-term growth",
        cta: "Book Now",
        investorHeading: "A Structured Approach to Land Investment"
      };

  return (
    <div className="bg-black text-white">
      {/* ------------------- HERO (CINEMATIC) ------------------- */}
      <header className="relative h-screen overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-vrindavan.jpg"
        >
          <source src="/vrindavan-flyover.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-amber-900/30" />

        <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-center text-center px-6">
          <div className="max-w-3xl">
            <button
              onClick={() => setLang((l) => (l === "hi" ? "en" : "hi"))}
              className="absolute right-6 top-6 bg-amber-400 text-black px-4 py-2 rounded-full font-semibold"
            >
              {lang === "hi" ? "EN" : "हिं"}
            </button>

            <h1 className="text-4xl md:text-6xl font-serif font-extrabold leading-tight mb-6">
              {t.heroTitleMain}
            </h1>

            <p className="text-lg text-gray-300 mb-8">{t.heroSub}</p>

            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="#projects"
                className="bg-gradient-to-r from-amber-400 to-yellow-300 text-black px-8 py-3 rounded-full font-semibold inline-flex items-center gap-3 shadow-lg hover:scale-105 transition-transform"
              >
                {t.cta} <Play className="w-4 h-4" />
              </a>

              <a
                href="#investor"
                className="border border-amber-400 px-6 py-3 rounded-full text-amber-400 hover:bg-amber-400 hover:text-black transition"
              >
                {lang === "hi" ? "निवेशक जानकारी" : "Investor Info"}
              </a>
            </div>

            <div className="mt-8 text-sm text-gray-400">
              <strong className="text-amber-400">Note:</strong>{" "}
              Starting rates (used on site) are taken from project brochures you
              provided. See project cards for citations.
            </div>
          </div>
        </div>
      </header>

      {/* ------------------- TRUST STRIP ------------------- */}
      <section className="bg-gray-900 py-10">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center px-6">
          <div>
            <div className="text-2xl font-bold text-amber-400">10,000+</div>
            <div className="text-sm text-gray-400">Happy families</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-400">0% EMI</div>
            <div className="text-sm text-gray-400">Select plans</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-400">Transparent</div>
            <div className="text-sm text-gray-400">Registry & documentation</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-400">Prime</div>
            <div className="text-sm text-gray-400">Vrindavan & surrounding corridors</div>
          </div>
        </div>
      </section>

      {/* ------------------- PROJECTS ------------------- */}
      <section id="projects" className="py-20 container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-10">Our Premium Projects</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {PROJECTS.map((p) => (
            <article key={p.id} className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
              <img src={p.image} alt={p.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-400 mb-2">{p.title}</h3>
                <div className="text-gray-300 mb-3">{p.location}</div>
                <div className="text-gray-200 font-semibold mb-4">
                  Start: ₹{p.startingRate.toLocaleString()} {p.unit}{" "}
                  <span className="text-xs text-gray-400 ml-2">({p.source || "brochure"})</span>
                </div>

                <div className="flex gap-3">
                  <a
                    href={p.slug}
                    className="px-4 py-2 rounded-full bg-amber-400 text-black font-semibold"
                  >
                    View Details
                  </a>
                  <button
                    className="px-4 py-2 border border-amber-400 rounded-full text-amber-400"
                    onClick={() => {
                      setSelectedProject(p.id);
                      window.location.hash = "#emi";
                    }}
                  >
                    Check EMI
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------- INVESTOR AUTHORITY ------------------- */}
      <section id="investor" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">{lang === "hi" ? "निवेश के लिए संरचित दृष्टिकोण" : "A Structured Approach to Land Investment"}</h2>

          <p className="text-gray-400 mb-10">
            We focus on projects positioned on high-growth corridors, with transparent
            documentation and disciplined payment models — built to preserve and grow capital.
            (Company overview & project placement from Fanbe Group presentation). :contentReference[oaicite:6]{index=6}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold text-amber-400 mb-3">High Growth Corridors</h3>
              <p className="text-gray-300">Projects near NH corridors, temple zones and fast-developing tourism pockets. See Brijvatika & Gokul placement in brochures. </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold text-amber-400 mb-3">Disciplined Payment Models</h3>
              <p className="text-gray-300">Payment plans and monthly EMI options are published in each project brochure (24 / 40 / 54 month examples). Example: Brijvatika / Maa Semri payment plans. </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold text-amber-400 mb-3">Asset-Backed Ownership</h3>
              <p className="text-gray-300">Tangible land plots with site maps, local connectivity and registry process detailed in brochures. :contentReference[oaicite:9]{index=9}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------- EMI (project-driven) ------------------- */}
      <section id="emi" className="py-16 container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">Quick EMI Estimate</h3>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-4">
            <label className="text-gray-300">Project</label>
            <select
              className="bg-gray-800 text-white px-3 py-2 rounded"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              {PROJECTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>

            <label className="text-gray-300">Plot size</label>
            <select
              className="bg-gray-800 text-white px-3 py-2 rounded"
              value={plotSize}
              onChange={(e) => setPlotSize(Number(e.target.value))}
            >
              <option value={50}>50</option>
              <option value={60}>60</option>
              <option value={80}>80</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="text-2xl">
            <div className="text-gray-300">Estimated Total</div>
            <div className="text-3xl font-bold text-amber-400 mt-2">₹{totalPrice.toLocaleString()}</div>
            <div className="text-gray-400 mt-2">Estimated EMI (~{months} months):</div>
            <div className="text-2xl font-semibold text-white mt-1">₹{monthlyEmi.toLocaleString()} / month</div>
            <div className="text-xs text-gray-500 mt-2">This is an estimate. See full payment plan in each brochure. </div>
          </div>
        </div>
      </section>

      {/* ------------------- FOUNDER / AUTHORITY FOOTER ------------------- */}
      <section className="py-16 bg-gray-900 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-2xl font-serif font-bold mb-4">Vision & Leadership</h3>
          <p className="text-gray-300 mb-6">
            Fanbe Group is led by a team with multi-year experience in plotted developments.
            Our focus is on quality, transparency, and steady growth for investors. (See message from MD in company PPT.) :contentReference[oaicite:11]{index=11}
          </p>
          <div className="inline-block border border-amber-400 px-6 py-4 rounded-lg">
            <div className="font-bold text-amber-400">Managing Director</div>
            <div className="text-gray-300 text-sm mt-1">Fanbe Group</div>
          </div>
        </div>
      </section>
    </div>
  );
}
