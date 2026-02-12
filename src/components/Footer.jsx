import React, { useContext } from 'react';
import { Menu, Languages } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext'; // Create below

const Header = () => {
  const { lang, toggleLang } = useContext(LanguageContext);

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-lg border-b border-amber-100">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
          Fanbe Group
        </a>
        <ul className="hidden md:flex gap-8 text-lg font-semibold text-gray-700">
          <li><a href="/" className="hover:text-amber-500 transition">Home</a></li>
          <li><a href="/projects" className="hover:text-amber-500 transition">Projects</a></li>
          <li><a href="/about" className="hover:text-amber-500 transition">About</a></li>
          <li><a href="/contact" className="hover:text-amber-500 transition">Contact</a></li>
          <li><a href="/crm/login" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition">CRM Login</a></li>
        </ul>
        <div className="flex items-center gap-4">
          <button onClick={toggleLang} className="p-2 hover:bg-amber-100 rounded-lg transition">
            <Languages className="w-6 h-6" />
          </button>
          <Menu className="md:hidden w-6 h-6 text-gray-600" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
