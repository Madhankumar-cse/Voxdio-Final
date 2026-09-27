import { useState } from 'react';
import {
  FileText,
  BookOpen,
  ArrowRight,
  Cpu,
  Activity,
  Layers,
  ShieldCheck,
  Server
} from 'lucide-react';
import { ResearchTopic } from '../types';

interface ResearchSectionProps {
  onOpenWhitepaper: (topic: ResearchTopic) => void;
}

export default function ResearchSection({ onOpenWhitepaper }: ResearchSectionProps) {
  const researchPapers: ResearchTopic[] = [
    {
      id: 'acoustic-forensics',
      title: 'Acoustic Forensics: Phase Incoherence in Neural Vocoders',
      category: 'Spectral Analysis',
      abstract:
        'Investigation into the phase discontinuities present in state-of-the-art diffusion vocoders. We demonstrate that while generative models produce convincing magnitudes, phase gradient coherence reveals synthetic provenance with 99.4% precision.',
      methodology:
        'Extracted Short-Time Fourier Transform (STFT) phase spectra across 20,000 synthetic audio clips. Calculated instantaneous frequency deviations across harmonic overtones above 4.2kHz.',
      benchmarkScore: '0.42% EER (ASVspoof 2024)',
      readTime: '6 min read',
      citations: 34
    },
    {
      id: 'dsp',
      title: 'Digital Signal Processing: Mel-Scale Filterbanks & CQCC',
      category: 'Signal Processing',
      abstract:
        'A hybrid approach combining Constant-Q Cepstral Coefficients (CQCC) with 128-band Mel-Scale filterbanks to capture non-stationary spectral dynamics under low-bitrate telecommunication compression.',
      methodology:
        'Applied multi-rate filterbanks to isolate acoustic ringing in cellular AMR-WB and G.711 voice codecs, decoupling network compression artifacts from generative vocoder anomalies.',
      benchmarkScore: '99.1% Codec Invariance',
      readTime: '8 min read',
      citations: 52
    },
    {
      id: 'mfcc-features',
      title: 'MFCC Features: Delta & Delta-Delta Cepstral Distribution',
      category: 'Feature Engineering',
      abstract:
        'Evaluating the distribution of velocity (delta) and acceleration (delta-delta) coefficients derived from 39-dimensional MFCC vectors for real-time phoneme boundary anomaly detection.',
      methodology:
        'Demonstrates how neural text-to-speech models struggle with organic vocal tract inertia during rapid consonant-vowel transitions, leading to mathematical anomalies in dynamic MFCC coefficients.',
      benchmarkScore: '98.8% F1-Score',
      readTime: '5 min read',
      citations: 29
    },
    {
      id: 'anti-spoof-research',
      title: 'Anti-Spoof Research: Conformer-Res2Net Hybrid Architecture',
      category: 'Deep Learning',
      abstract:
        'Design and evaluation of a dual-branch neural network integrating Conformer multi-head self-attention with multi-scale Res2Net residual blocks for zero-shot synthetic voice detection.',
      methodology:
        'Conformer blocks extract global temporal dependencies while Res2Net modules focus on local spectral granularity, achieving state-of-the-art classification with minimal parameter footprint.',
      benchmarkScore: 'Top 3 ASVspoof Benchmark',
      readTime: '11 min read',
      citations: 67
    },
    {
      id: 'enterprise-deployment',
      title: 'Enterprise Deployment: Low-Overhead ONNX Quantized Inference',
      category: 'Edge Infrastructure',
      abstract:
        'Post-training INT8 and FP16 quantization strategies for deploying deep acoustic classifiers in carrier-grade telephone switches with sub-180ms round-trip latency budgets.',
      methodology:
        'Optimized ONNX Runtime graphs using AVX-512 vector instructions and circular ring buffers, reducing memory footprint by 74% with less than 0.05% loss in detection accuracy.',
      benchmarkScore: '164ms Inline Latency',
      readTime: '7 min read',
      citations: 18
    }
  ];

  return (
    <section id="research" className="py-20 sm:py-24 relative overflow-hidden bg-[#050816]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
            <span>PEER-REVIEWED SCIENTIFIC RIGOR</span>
            <span aria-hidden="true">·</span>
            <span>SMART INDIA HACKATHON PAPERS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Acoustic & Deep Learning Research
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Our detection engine is grounded in peer-reviewed acoustic physics, digital signal processing theory, and modern neural vocoder forensics.
          </p>
        </div>

        {/* 5 Research Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchPapers.map((paper) => (
            <div
              key={paper.id}
              onClick={() => onOpenWhitepaper(paper)}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer hover:-translate-y-1 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-cyan-400 uppercase text-[11px]">
                    {paper.category}
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">{paper.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  {paper.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {paper.abstract}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-400 font-medium">
                  {paper.benchmarkScore}
                </span>
                <span className="text-cyan-400 flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Read Paper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}

          {/* 6th Card: Research Archive Summary */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-blue-950/20 to-slate-950 border border-cyan-500/30 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-xs font-mono text-cyan-400 uppercase">
                OPEN RESEARCH INITIATIVE
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Smart India Hackathon 2026 Academic Archive
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All benchmark scripts, audio dataset normalization tools, and PyTorch evaluation harnesses are released under open academic access for national cyber safety research.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>ASVspoof 2024 Leaderboard</span>
              <span className="text-cyan-300 font-mono">Team RETRYAVENGERS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
