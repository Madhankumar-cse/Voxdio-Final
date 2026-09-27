import { useState } from 'react';
import { X, Play, Pause, Volume2, ShieldCheck, Cpu, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { browserAudioPlayer } from '../lib/audioSamples';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen) return null;

  const demoSteps = [
    {
      title: '01. The Threat: Zero-Shot Executive Voice Clone',
      subtitle: 'Attacker harvests 10 seconds of CEO audio from earnings call and generates synthetic wire transfer authorization.',
      metrics: 'Latency: 1.2s | High-frequency phase incoherence detected at 8.4kHz',
      threatLevel: 'CRITICAL ATTACK',
      color: 'text-red-400 border-red-500/30 bg-red-950/30'
    },
    {
      title: '02. Ingestion & Low-Latency SIP Trunk Mirroring',
      subtitle: 'VOXDIO AI taps PBX carrier stream via WebRTC/SIP in sub-180ms. Audio is normalized and split into 25ms Hamming frames.',
      metrics: 'Carrier: Enterprise PBX Trunk | Throughput: 48,000 samples/sec',
      threatLevel: 'BUFFERING STREAM',
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/30'
    },
    {
      title: '03. Acoustic Forensics & Phase Alignment',
      subtitle: 'Digital signal processing extracts MFCCs, delta features, and neural vocoder artifacts that human ears cannot perceive.',
      metrics: 'Feature Vector: 128 Mel-bands | Conformer-Res2Net Attention Score: 0.98',
      threatLevel: 'DEEP DSP ANALYSIS',
      color: 'text-purple-400 border-purple-500/30 bg-purple-950/30'
    },
    {
      title: '04. Verdict & Automated Fraud Neutralization',
      subtitle: 'Confidence reaches 96% AI Clone. SIP Gateway triggers automated call drop and alerts treasury SOC dashboard.',
      metrics: 'Execution: 164ms total latency | Financial Loss Prevented: $2.4M',
      threatLevel: 'ATTACK TERMINATED',
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/30'
    }
  ];

  const handleAuditionTone = async () => {
    if (isPlayingAudio) {
      browserAudioPlayer.stop();
      setIsPlayingAudio(false);
      return;
    }
    setIsPlayingAudio(true);
    await browserAudioPlayer.playTone('clone_deepfake', 3.5);
    setIsPlayingAudio(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#080d21] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#050816]">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-cyan-500/20 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                VOXDIO AI — Interactive Architecture & Defense Walkthrough
              </h3>
              <p className="text-xs text-slate-400">
                Smart India Hackathon 2026 Production Demo System
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Simulated Video Player Stage */}
          <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-6">
            {/* Background cyber grid & scanlines */}
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scanline pointer-events-none" />

            {/* Top Stage Badges */}
            <div className="relative z-10 flex items-center justify-between">
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${demoSteps[activeStep].color}`}>
                STAGE {activeStep + 1}/4 : {demoSteps[activeStep].threatLevel}
              </span>
              <span className="text-xs font-mono text-slate-400">
                VOXDIO-GATEWAY://ACTIVE_INSPECTION
              </span>
            </div>

            {/* Center Animation Content */}
            <div className="relative z-10 text-center space-y-3 max-w-xl mx-auto py-4">
              <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {demoSteps[activeStep].title}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {demoSteps[activeStep].subtitle}
              </p>
              <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300">
                {demoSteps[activeStep].metrics}
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-800/80">
              <button
                onClick={handleAuditionTone}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isPlayingAudio ? 'Playing Forensic Audio...' : 'Hear Acoustic Anomaly'}</span>
              </button>

              <div className="flex items-center gap-2">
                {demoSteps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${activeStep === i ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
                    aria-label={`Jump to stage ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-medium cursor-pointer"
                >
                  Prev
                </button>
                <button
                  onClick={() => setActiveStep((prev) => (prev + 1) % demoSteps.length)}
                  className="px-3 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  {activeStep === demoSteps.length - 1 ? 'Replay' : 'Next Step'}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Technical Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-cyan-400 font-semibold mb-1 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>Spectral Phase Forensics</span>
              </div>
              <p className="text-slate-400">
                Zero-shot clones use neural vocoders that leave phase-shift discontinuities in frequencies &gt; 4kHz.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-blue-400 font-semibold mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Biometric Jitter Analysis</span>
              </div>
              <p className="text-slate-400">
                Natural human vocal cords exhibit micro-perturbations (jitter/shimmer) lacking in synthetic speech.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-emerald-400 font-semibold mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Sub-180ms Latency</span>
              </div>
              <p className="text-slate-400">
                Engineered with FastAPI, ONNX, and PyTorch C++ bindings for carrier-grade inline call termination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
