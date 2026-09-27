import {
  Filter,
  RefreshCw,
  SlidersHorizontal,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Zap
} from 'lucide-react';

export default function SecuritySection() {
  const securityPillars = [
    {
      id: 'noise-filtering',
      title: 'Noise Filtering & Spectral Gating',
      subtitle: 'Adaptive Wiener & Ambient Isolation',
      desc: 'Separates foreground vocal cords from background acoustic noise (traffic, air conditioning, packet loss jitter) using adaptive spectral subtraction and Wiener filtering without stripping subtle biometric harmonics.',
      metrics: '+28dB SNR Improvement',
      features: ['Dynamic noise floor estimation', 'Non-linear spectral gating', 'Packet loss concealment (PLC) resilient'],
      icon: Filter
    },
    {
      id: 'adaptive-models',
      title: 'Adaptive Defense Models',
      subtitle: 'Zero-Day Synthesis Countermeasures',
      desc: 'Continual adversarial training against emergent commercial cloning architectures (ElevenLabs Multilingual v2/v3, Meta Voicebox, Microsoft VALL-E 2, XTTS) to prevent model staleness.',
      metrics: 'Zero-Day Immune',
      features: ['Self-supervised latent embeddings', 'Online active learning loop', 'Vocoder fingerprint registry'],
      icon: RefreshCw
    },
    {
      id: 'false-positive',
      title: 'False Positive Reduction',
      subtitle: 'Biometric Variance Tolerancing',
      desc: 'Custom vocal cord biological models accommodate natural human vocal stress, hoarseness, respiratory illness, and elderly pitch drift, keeping the false rejection rate under 0.12%.',
      metrics: '< 0.12% FRR',
      features: ['Biometric vocal tract bounds', 'Age & health drift compensation', 'Double-pass verification window'],
      icon: SlidersHorizontal
    },
    {
      id: 'low-latency',
      title: 'Low Latency Pipeline',
      subtitle: 'C++ ONNX Runtime Inline Execution',
      desc: 'Engineered for sub-180ms total loop latency. Audio chunks are analyzed in 25ms ring buffers in memory, allowing telephone carriers to drop fraudulent calls before the victim can answer.',
      metrics: '< 180ms Execution',
      features: ['Zero disk read/write cycles', 'SIMD AVX-512 acceleration', 'Direct SIP trunk packet tap'],
      icon: Clock
    }
  ];

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden bg-[#040714] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
            <span>RESILIENCE & RELIABILITY</span>
            <span aria-hidden="true">·</span>
            <span>ENTERPRISE CYBER ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Carrier-Grade Security Architecture
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Eliminating false alarms and subverting adversarial evasion techniques through mathematical rigor.
          </p>
        </div>

        {/* 4 Security Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      {pillar.metrics}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-cyan-400 font-medium font-mono mt-0.5">
                      {pillar.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-1.5">
                  {pillar.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Compliance & Standards Bar */}
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">Enterprise Privacy & Zero Data Retention</span>
              <span className="text-slate-400">Audio frames are processed strictly in volatile RAM and purged immediately after classification.</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>SOC2 TYPE II</span>
            <span>·</span>
            <span>ISO 27001</span>
            <span>·</span>
            <span>DPDP ACT 2023</span>
          </div>
        </div>
      </div>
    </section>
  );
}
