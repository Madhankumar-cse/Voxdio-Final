import { useState } from 'react';
import { ShieldCheck, Menu, X, Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenVideo: () => void;
}

export default function Navbar({ onOpenVideo }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#050816]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element brand wordmark */}
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-white hover:text-cyan-400 transition-colors flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shadow-cyan-500/20">
            <ShieldCheck className="w-5 h-5 text-slate-950" />
          </div>
          <span>VOXDIO AI</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => scrollToSection('demo')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            Live Demo
          </button>
          <button
            onClick={() => scrollToSection('dashboard')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            Risk Dashboard
          </button>
          <button
            onClick={() => scrollToSection('pipeline')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('tech')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            Technology
          </button>
          <button
            onClick={() => scrollToSection('team')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            Team
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenVideo}
            className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors border border-slate-700/60 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>FastAPI Docs</span>
          </button>
          <button
            onClick={() => scrollToSection('demo')}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-lg transition-all shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/35 whitespace-nowrap cursor-pointer"
          >
            Try Demo
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="flex sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-800 bg-[#070b1e] px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => scrollToSection('demo')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-md"
          >
            Live Demo
          </button>
          <button
            onClick={() => scrollToSection('dashboard')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-md"
          >
            Risk Dashboard
          </button>
          <button
            onClick={() => scrollToSection('pipeline')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-md"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-md"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('tech')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-md"
          >
            Technology & Architecture
          </button>
          <button
            onClick={() => scrollToSection('solutions')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-md"
          >
            Industry Solutions
          </button>
          <button
            onClick={() => scrollToSection('team')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-md"
          >
            Team RETRYAVENGERS
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-md"
          >
            Contact
          </button>
          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => scrollToSection('demo')}
              className="flex-1 py-2 text-center text-xs font-semibold text-white bg-blue-600 rounded-lg"
            >
              Try Demo
            </button>
            <button
              onClick={onOpenVideo}
              className="flex-1 py-2 text-center text-xs font-semibold text-slate-200 border border-slate-700 rounded-lg"
            >
              Architecture Video
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
