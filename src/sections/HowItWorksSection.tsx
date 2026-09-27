import { useState } from 'react';
import {
  Mic,
  Cpu,
  Activity,
  ShieldAlert,
  Sliders,
  ArrowRight,
  Layers,
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      step: '01',
      title: 'Voice Input Ingestion',
      subtitle: 'Lossless Audio Ingestion',
      icon: Mic,
      tag: 'WebRTC / SIP Trunk',
      desc: 'Ingests inbound streaming audio in raw PCM format (16–48kHz) via lightweight carrier hooks or browser WebRTC gateways with zero downsampling loss.',
      specs: ['Sub-15ms buffer framing', '48kHz / 16-bit PCM fidelity', 'Jitter-buffer adaptation'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      step: '02',
      title: 'Feature Extraction',
      subtitle: 'DSP Signal Decomposition',
      icon: Sliders,
      tag: 'Librosa & Fast DSP',
      desc: 'Transforms time-domain waveform into 128-band Log Mel-Spectrograms, Constant-Q Cepstral Coefficients (CQCC), and 39-dimensional MFCCs + deltas.',
      specs: ['25ms Hamming window (10ms hop)', 'Mel-filterbank decomposition', 'Pitch jitter & shimmer tracking'],
      color: 'from-cyan-500 to-blue-600'
    },
    {
      step: '03',
      title: 'Acoustic Forensics',
      subtitle: 'Sub-audible Phase Scanning',
      icon: Activity,
      tag: 'Neural Vocoder Saliency',
      desc: 'Uncovers microscopic anomalies invisible to human ears: neural vocoder high-frequency cutoff, phase continuity gaps, and synthetic prosody dissonance.',
      specs: ['Phase gradient discontinuity', 'Diffusion artifact detection', 'Formant resonance analysis'],
      color: 'from-blue-600 to-purple-600'
    },
    {
      step: '04',
      title: 'AI Multi-Task Detection',
      subtitle: 'Conformer + Res2Net Model',
      icon: Cpu,
      tag: 'Deep Neural Classifier',
      desc: 'Dual-branch Conformer neural network with cross-attention maps voice embeddings against known deepfake generation algorithms (ElevenLabs, XTTS, Voicebox).',
      specs: ['99.4% ASVspoof benchmark', 'Zero-shot clone discrimination', 'ONNX Quantized inference'],
      color: 'from-purple-600 to-pink-600'
    },
    {
      step: '05',
      title: 'Real-Time Risk Score',
      subtitle: 'Automated Fraud Policy',
      icon: ShieldAlert,
      tag: 'Policy Enforcement',
      desc: 'Computes instantaneous confidence & risk index (0–100%). Triggers automatic PBX call termination, SOC webhooks, or secondary biometric challenge.',
      specs: ['<180ms total loop latency', 'Configurable risk thresholds', 'FastAPI & SIP webhook push'],
      color: 'from-pink-600 to-red-500'
    }
  ];

  return (
    <section id="pipeline" className="py-20 sm:py-24 relative overflow-hidden bg-[#050816]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
            <span>DETECTION PIPELINE</span>
            <span aria-hidden="true">·</span>
            <span>END-TO-END ACOUSTIC FORENSICS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How VOXDIO AI Works
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From raw telecommunication packet to sub-second fraud neutralization across five rigorous forensic layers.
          </p>
        </div>

        {/* 5 Animated Steps Connected with Animated Arrows */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = activeStep === idx;
            return (
              <div key={item.step} className="relative flex flex-col">
                <div
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`p-5 rounded-2xl border transition-all duration-300 flex-1 flex flex-col justify-between space-y-4 cursor-pointer ${
                    isHovered
                      ? 'bg-slate-900/90 border-cyan-500/60 shadow-xl shadow-cyan-950/40 -translate-y-1'
                      : 'bg-slate-900/40 border-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-black text-slate-600">
                        {item.step}
                      </span>
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-md shadow-cyan-500/20`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-0.5">
                        {item.tag}
                      </span>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Micro Specs */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-1">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Animated Arrow Connector (hidden on last step & mobile) */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-slate-950 border border-cyan-500/40 text-cyan-400 items-center justify-center shadow-md">
                    <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Step Detailed Diagnostic Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-[#070d24] to-slate-950 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase">
              <Zap className="w-3.5 h-3.5" />
              <span>STAGE {steps[activeStep].step} FORENSIC DEEP-DIVE</span>
            </div>
            <h4 className="text-lg font-bold text-white">
              {steps[activeStep].title} — {steps[activeStep].subtitle}
            </h4>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {steps[activeStep].desc} All processing takes place within an inline memory ring buffer requiring zero disk I/O, guaranteeing strict compliance with enterprise privacy regulations (GDPR, HIPAA, and DPDP Act 2023).
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right font-mono text-xs">
              <div className="text-slate-400">Pipeline Latency</div>
              <div className="text-cyan-300 font-bold">&lt; 35ms this stage</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Layers className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
