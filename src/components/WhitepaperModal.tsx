import { X, FileText, CheckCircle, ExternalLink, Download } from 'lucide-react';
import { ResearchTopic } from '../types';

interface WhitepaperModalProps {
  topic: ResearchTopic | null;
  onClose: () => void;
}

export default function WhitepaperModal({ topic, onClose }: WhitepaperModalProps) {
  if (!topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#090e24] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#050816]">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-blue-500/20 text-cyan-400">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                VOXDIO RESEARCH · SIH 2026 ARCHIVE
              </span>
              <h3 className="text-base font-bold text-white tracking-tight">
                {topic.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Paper Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pb-4 border-b border-slate-800">
            <div>
              <span className="text-slate-500">Category: </span>
              <span className="text-cyan-300 font-medium">{topic.category}</span>
            </div>
            <span>·</span>
            <div>
              <span className="text-slate-500">Benchmark: </span>
              <span className="text-emerald-400 font-mono font-medium">{topic.benchmarkScore}</span>
            </div>
            <span>·</span>
            <div>
              <span className="text-slate-500">Read Time: </span>
              <span>{topic.readTime}</span>
            </div>
            <span>·</span>
            <div>
              <span className="text-slate-500">Citations: </span>
              <span>{topic.citations} papers</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 font-semibold">
              Abstract
            </h4>
            <p className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-slate-200">
              {topic.abstract}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 font-semibold">
              Methodology & Neural Architecture
            </h4>
            <p className="text-slate-300 leading-relaxed mb-3">
              {topic.methodology}
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Dual-branch Conformer with 128-band Log-Mel Filterbanks and Constant-Q Cepstral Coefficients (CQCC).</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Phase gradient saliency mapping targeting diffusion vocoder artifacts (DiffWave, HiFi-GAN, WaveGrad).</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>FP16 INT8 quantized ONNX inference engine delivering &lt;180ms round-trip latency.</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-between">
            <div className="text-xs">
              <div className="font-semibold text-white">Full Research Preprint Available</div>
              <div className="text-slate-400">Published under open academic access for Smart India Hackathon 2026.</div>
            </div>
            <button
              onClick={() => {
                alert('Preprint PDF downloaded to temporary memory buffer.');
              }}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#050816] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
}
