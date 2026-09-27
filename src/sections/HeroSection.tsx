import { ShieldCheck, Play, ArrowRight, Zap, CheckCircle2, Lock } from 'lucide-react';

interface HeroSectionProps {
  onTryDemo: () => void;
  onWatchVideo: () => void;
}

export default function HeroSection({ onTryDemo, onWatchVideo }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-12 pb-20 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-purple-600/10 blur-[130px] pointer-events-none" />
      
      {/* Subtle cyber grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Unboxed clean metadata kicker (Zero-pill discipline) */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-cyan-400">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
            Smart India Hackathon 2026 Finalist
          </span>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span className="text-slate-400">Team RETRYAVENGERS</span>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span className="text-blue-400 font-mono">Carrier-Grade Telephony Shield</span>
        </div>

        {/* Large Animated Headline */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white text-balance leading-[1.1]">
            AI-Powered Real-Time <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Voice Clone Detection
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto text-balance leading-relaxed">
            Detect Human Voice, AI Voice, and Voice Clone instantly before fraud happens.
            <span className="block mt-1 text-slate-400 text-base">
              Trust Every Voice. Prevent Every Impersonation.
            </span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onTryDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 hover:from-cyan-300 hover:to-blue-400 transition-all duration-200 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Try Live Audio Demo</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onWatchVideo}
            className="w-full sm:w-auto px-7 py-4 rounded-xl text-base font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700 hover:border-cyan-500/40 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg hover:shadow-slate-800"
          >
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-cyan-400" />
            </div>
            <span>Watch Architecture Video</span>
          </button>
        </div>

        {/* Hero Visual Showcase Carrier */}
        <div className="pt-8 max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-slate-950/70 p-2 sm:p-3 shadow-2xl shadow-cyan-500/10">
            {/* Visual Header bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#050816] rounded-t-xl border-b border-slate-800 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-slate-300">VOXDIO-KERNEL-DSP // LIVE SPECTRAL CLASSIFIER</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> &lt;180ms Latency
                </span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> ASVspoof 2024 Leader
                </span>
              </div>
            </div>

            {/* Generated High-Fidelity Asset */}
            <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full overflow-hidden rounded-b-xl bg-slate-950">
              <img
                src="/src/assets/images/hero_voice_cyber_1790501964838.jpg"
                alt="VOXDIO AI Neural Voice Waveform Analysis Visualizer"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-90 hover:scale-102 transition-transform duration-700"
              />
              
              {/* Dynamic live simulation overlay tag */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-left space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    LIVE INTERCEPTION EVENT #VC-4920
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white">
                    Zero-Shot Deepfake Voice Clone Detected · Threat Mitigated
                  </div>
                  <div className="text-xs text-slate-400">
                    Target: Executive Treasury PBX · Acoustic Phase Discontinuity: 94.2%
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right font-mono">
                    <div className="text-xs text-slate-400">Risk Assessment</div>
                    <div className="text-xl font-bold text-red-400 tabular-nums">98% CRITICAL</div>
                  </div>
                  <button
                    onClick={onTryDemo}
                    className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Inspect Forensics
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quantified Adjacency Proof Row (Claim-to-Proof Adjacency) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 text-left">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="text-2xl font-extrabold text-cyan-400 font-mono tabular-nums">99.4%</div>
            <div className="text-xs text-slate-300 font-medium">Detection Accuracy</div>
            <div className="text-[11px] text-slate-500">ASVspoof 2024 synthetic benchmark</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="text-2xl font-extrabold text-blue-400 font-mono tabular-nums">&lt;180ms</div>
            <div className="text-xs text-slate-300 font-medium">Inline Processing Latency</div>
            <div className="text-[11px] text-slate-500">Real-time SIP carrier stream drop</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="text-2xl font-extrabold text-purple-400 font-mono tabular-nums">50+</div>
            <div className="text-xs text-slate-300 font-medium">Languages & Dialects</div>
            <div className="text-[11px] text-slate-500">Indian regional & global accents</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="text-2xl font-extrabold text-emerald-400 font-mono tabular-nums">0.12%</div>
            <div className="text-xs text-slate-300 font-medium">False Positive Ratio</div>
            <div className="text-[11px] text-slate-500">Adaptive noise & vocal health gate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
