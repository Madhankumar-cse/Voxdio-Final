import { ShieldCheck, Github, Linkedin, Twitter, ArrowUp, Lock, Terminal, Cpu } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#040613] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-cyan-500/20">
                <ShieldCheck className="w-5 h-5 text-slate-950" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">VOXDIO AI</span>
            </div>

            <p className="text-base text-slate-300 font-medium tracking-tight">
              Trust Every Voice. Prevent Every Impersonation.
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Real-time deepfake audio forensics and zero-shot voice clone detection platform engineered for Smart India Hackathon 2026 by Team RETRYAVENGERS.
            </p>

            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                aria-label="Twitter Community"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('demo')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Interactive Audio Demo
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('dashboard')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Risk & Threat Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('pipeline')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  5-Step Detection Pipeline
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('features')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Core Enterprise Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('comparison')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Benchmark Comparison
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions & Tech */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              Solutions & Tech
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('solutions')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Banking & Financial KYC
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('solutions')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Telecom Carrier Filtering
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('solutions')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Government & Defense Comms
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('tech')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  FastAPI & Python Engine
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('research')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  ASVspoof Research Papers
                </button>
              </li>
            </ul>
          </div>

          {/* Hackathon & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              Hackathon Track
            </h4>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Smart India Hackathon 2026</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Problem Statement: Real-time Audio Deepfake and Voice Clone Detection for Cyber Fraud Mitigation.
              </p>
              <div className="text-[11px] text-blue-400 font-mono">
                Team: RETRYAVENGERS
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span>© 2026 VOXDIO AI. Built for Smart India Hackathon.</span>
            <span>·</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              FastAPI Streaming Nodes Operational
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo('contact')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Enterprise Pilot
            </button>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
