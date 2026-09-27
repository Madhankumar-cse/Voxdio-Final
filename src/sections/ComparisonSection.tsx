import { Check, X, Minus, ShieldCheck, Zap } from 'lucide-react';

export default function ComparisonSection() {
  const comparisonData = [
    {
      feature: 'Human Voice Detection',
      generic: 'Partial',
      genericStatus: 'partial',
      genericNote: 'Basic acoustic thresholds only',
      voxdio: 'Yes',
      voxdioStatus: 'yes',
      voxdioNote: 'Formant tracking & respiratory micro-tremors'
    },
    {
      feature: 'AI Synthetic Detection',
      generic: 'Limited',
      genericStatus: 'partial',
      genericNote: 'Detects simple robotic TTS',
      voxdio: 'Yes',
      voxdioStatus: 'yes',
      voxdioNote: 'Detects modern diffusion models & vocoders'
    },
    {
      feature: 'Zero-Shot Clone Detection',
      generic: 'No',
      genericStatus: 'no',
      genericNote: 'Fails against ElevenLabs & Voicebox',
      voxdio: 'Yes',
      voxdioStatus: 'yes',
      voxdioNote: 'Cross-entropy phase anomaly classifier'
    },
    {
      feature: 'Calibrated Real-Time Risk Score',
      generic: 'No',
      genericStatus: 'no',
      genericNote: 'Binary output without confidence',
      voxdio: 'Yes',
      voxdioStatus: 'yes',
      voxdioNote: '0-100% dynamic policy risk score'
    },
    {
      feature: 'Enterprise Streaming API',
      generic: 'Limited',
      genericStatus: 'partial',
      genericNote: 'Batch HTTP upload only (>3s lag)',
      voxdio: 'Yes',
      voxdioStatus: 'yes',
      voxdioNote: 'FastAPI async streaming <180ms inline'
    },
    {
      feature: 'Spectral Phase Forensics',
      generic: 'No',
      genericStatus: 'no',
      genericNote: 'Only checks raw amplitude/pitch',
      voxdio: 'Yes',
      voxdioStatus: 'yes',
      voxdioNote: '128-band Mel & phase gradient continuity'
    },
    {
      feature: 'Air-Gapped Enterprise Deployment',
      generic: 'No',
      genericStatus: 'no',
      genericNote: 'Requires continuous cloud upload',
      voxdio: 'Yes',
      voxdioStatus: 'yes',
      voxdioNote: 'Zero-telemetry on-premise container'
    },
    {
      feature: 'Smart India Hackathon 2026 Validated',
      generic: 'No',
      genericStatus: 'no',
      genericNote: 'Proprietary closed black box',
      voxdio: 'Yes',
      voxdioStatus: 'yes',
      voxdioNote: 'Engineered by Team RETRYAVENGERS'
    }
  ];

  return (
    <section id="comparison" className="py-20 sm:py-24 relative overflow-hidden bg-[#050816]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
            <span>BENCHMARK AUDIT</span>
            <span aria-hidden="true">·</span>
            <span>TECHNOLOGY ADVANTAGE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How VOXDIO AI Compares
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            While legacy tools perform retrospective post-call batch analysis, VOXDIO AI intercepts and terminates deepfakes mid-conversation.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80">
                  <th className="py-4 px-6 text-sm font-semibold text-slate-300 w-2/5">
                    Feature & Security Capability
                  </th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-400 w-1/4">
                    Generic Audio Tools
                  </th>
                  <th className="py-4 px-6 text-sm font-bold text-cyan-400 w-1/3 bg-cyan-950/30 border-l border-cyan-500/20">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-cyan-400" />
                      <span>VOXDIO AI Platform</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
                {comparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                    {/* Feature Name */}
                    <td className="py-4 px-6 text-white font-medium">
                      {row.feature}
                    </td>

                    {/* Generic Tools */}
                    <td className="py-4 px-6 text-slate-400">
                      <div className="flex items-center gap-2">
                        {row.genericStatus === 'no' ? (
                          <div className="w-5 h-5 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                            <X className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-yellow-500/10 text-yellow-400 flex items-center justify-center shrink-0">
                            <Minus className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <span className="font-semibold text-slate-300">{row.generic}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{row.genericNote}</div>
                    </td>

                    {/* VOXDIO AI */}
                    <td className="py-4 px-6 bg-cyan-950/20 border-l border-cyan-500/20">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 animate-pulse">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="font-bold text-white font-mono text-sm">{row.voxdio}</span>
                      </div>
                      <div className="text-[11px] text-cyan-300/80 mt-0.5">{row.voxdioNote}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <span>Independent benchmark tested against ASVspoof 2021/2024 and In-The-Wild Deepfake datasets.</span>
            <span className="text-cyan-400 font-mono">100% Deterministic Policy</span>
          </div>
        </div>
      </div>
    </section>
  );
}
