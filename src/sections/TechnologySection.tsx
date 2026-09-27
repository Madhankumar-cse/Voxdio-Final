import { useState } from 'react';
import {
  Cpu,
  Layers,
  Terminal,
  Activity,
  Zap,
  ArrowRight,
  ShieldCheck,
  Server,
  Code2,
  Workflow
} from 'lucide-react';

export default function TechnologySection() {
  const [selectedNode, setSelectedNode] = useState<number>(2);

  const techStack = [
    {
      category: 'Frontend',
      name: 'Next.js 15 & React',
      desc: 'High-performance responsive UI, streaming telemetry charts, and low-latency Web Audio API integration.',
      badge: 'Client Engine',
      color: 'from-blue-600 to-cyan-500'
    },
    {
      category: 'Backend',
      name: 'FastAPI (Python 3.11)',
      desc: 'Asynchronous event loop with Starlette, Uvicorn workers, and sub-millisecond serialization overhead.',
      badge: 'Async Microservice',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      category: 'AI / Deep Learning',
      name: 'PyTorch & ONNX Runtime',
      desc: 'Conformer-Res2Net dual-branch neural network optimized via FP16 tensor quantization.',
      badge: 'Neural Core',
      color: 'from-purple-500 to-pink-500'
    },
    {
      category: 'Audio Extraction',
      name: 'Librosa & Torchaudio',
      desc: 'High-precision Mel-scale filterbanks, Constant-Q Cepstral Coefficients, and pitch jitter computation.',
      badge: 'Acoustic Forensics',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      category: 'Signal Processing',
      name: 'DSP Algorithms',
      desc: 'Wiener noise reduction, Short-Time Fourier Transform (STFT), phase gradient reconstruction, and harmonic tracking.',
      badge: 'Mathematics Engine',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  const archNodes = [
    {
      id: 0,
      title: 'Inbound Audio Stream',
      sub: '48kHz / 16-bit PCM',
      desc: 'Incoming voice call from cellular carrier SIP trunk or enterprise PBX.'
    },
    {
      id: 1,
      title: 'SIP & WebRTC Gateway',
      sub: 'Sub-15ms Jitter Buffer',
      desc: 'Stream splitting and lossless frame windowing (25ms Hamming).'
    },
    {
      id: 2,
      title: 'DSP & Librosa Extraction',
      sub: '128-Band Log-Mel + MFCC',
      desc: 'Transforms raw audio into high-dimensional acoustic feature matrices.'
    },
    {
      id: 3,
      title: 'Conformer Neural Classifier',
      sub: 'ONNX Quantized Model',
      desc: 'Identifies vocoder diffusion artifacts and synthetic phase anomalies.'
    },
    {
      id: 4,
      title: 'FastAPI Risk Policy Engine',
      sub: '<180ms Round-Trip',
      desc: 'Evaluates risk score and issues instantaneous call termination payload.'
    }
  ];

  return (
    <section id="tech" className="py-20 sm:py-24 relative overflow-hidden bg-[#050816]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
            <span>ENGINEERING & INFRASTRUCTURE</span>
            <span aria-hidden="true">·</span>
            <span>PRODUCTION TECH STACK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            High-Performance Technology Stack
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Architected for microsecond efficiency and zero-compromise acoustic precision across every tier.
          </p>
        </div>

        {/* Tech Stack Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                  {tech.category}
                </span>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {tech.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {tech.desc}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {tech.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* End-to-End System Architecture Diagram */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase">
                <Workflow className="w-4 h-4" />
                <span>INTERACTIVE SYSTEM ARCHITECTURE</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                VOXDIO Telephony Ingestion & Deep Forensics Flow
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              Latency Target: &lt; 180ms Total
            </span>
          </div>

          {/* Interactive Flow Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative">
            {archNodes.map((node, index) => {
              const isSelected = selectedNode === index;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(index)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-lg shadow-cyan-950/60'
                      : 'bg-slate-950/70 border-slate-800/90 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-cyan-400">NODE 0{index + 1}</span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">
                    {node.title}
                  </h4>
                  <div className="text-[10px] font-mono text-slate-400 mb-2">
                    {node.sub}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {node.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Architecture Visual Illustration Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-4 border-t border-slate-800">
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-400 uppercase">
                  ACTIVE NODE DETAIL · {archNodes[selectedNode].title}
                </span>
                <h4 className="text-lg font-bold text-white">
                  {archNodes[selectedNode].title} ({archNodes[selectedNode].sub})
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {archNodes[selectedNode].desc}
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                VOXDIO_CORE_KERNEL://NODE_STATE: READY · STREAM_THROUGHPUT: 48,000 SAMPLES/SEC
              </div>
            </div>

            <div className="lg:col-span-6 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <img
                src="/src/assets/images/forensics_spectrogram_1790501979089.jpg"
                alt="DSP Audio Forensics Spectrogram Architecture"
                referrerPolicy="no-referrer"
                className="w-full h-52 object-cover opacity-85 hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
