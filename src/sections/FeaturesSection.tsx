import {
  Zap,
  Fingerprint,
  Activity,
  HeartPulse,
  Terminal,
  Cloud,
  Globe2,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      id: 'realtime',
      title: 'Real-Time Detection',
      tagline: '< 180ms End-to-End Latency',
      description: 'Carrier-grade streaming inference capable of classifying voice packets mid-call before financial transactions or sensitive data disclosures take place.',
      icon: Zap,
      metric: '164ms',
      metricLabel: 'Average Response Time',
      badge: 'Inline Telephony'
    },
    {
      id: 'clone-detect',
      title: 'AI Clone Detection',
      tagline: 'Zero-Shot Cross-Entropy Profiling',
      description: 'Identifies voices synthesized from as little as 3 seconds of reference audio by isolating generative phase signatures unique to commercial cloning models.',
      icon: Fingerprint,
      metric: '99.4%',
      metricLabel: 'ASVspoof Accuracy',
      badge: 'Zero-Shot Defense'
    },
    {
      id: 'forensics',
      title: 'Acoustic Forensics',
      tagline: 'Deep Phase Discontinuity Analysis',
      description: 'Detects microscopic vocoder frequency cutoffs, unnatural spectral tilt, and phase alignment anomalies that are completely inaudible to human operators.',
      icon: Activity,
      metric: '128-Band',
      metricLabel: 'Log-Mel Spectrograms',
      badge: 'DSP Engine'
    },
    {
      id: 'behavioral',
      title: 'Behavioral Analysis',
      tagline: 'Prosodic & Emotion Dissonance',
      description: 'Correlates conversational cadences, respiratory micro-pauses, and emotional inflection against synthetic robotic speech cadence patterns.',
      icon: HeartPulse,
      metric: '48kHz',
      metricLabel: 'Respiratory Formant Check',
      badge: 'Prosody AI'
    },
    {
      id: 'enterprise-api',
      title: 'Enterprise API',
      tagline: 'FastAPI REST & gRPC Streaming',
      description: 'Deploy seamless webhooks and bidirectional audio streams with comprehensive SDKs for Python, Node.js, Go, and enterprise PBX SIP gateways.',
      icon: Terminal,
      metric: '10,000+',
      metricLabel: 'Req / Sec / Cluster',
      badge: 'High Throughput'
    },
    {
      id: 'cloud-deploy',
      title: 'Cloud & On-Prem Deployment',
      tagline: 'Kubernetes, AWS, Azure & Air-Gapped',
      description: 'Deploy anywhere from hyperscale cloud clusters to sovereign air-gapped defense and banking datacenters with zero telemetry leaks.',
      icon: Cloud,
      metric: 'Zero-Disk',
      metricLabel: 'RAM Ring Buffer Ops',
      badge: 'Air-Gapped Ready'
    },
    {
      id: 'multilingual',
      title: 'Multilingual Support',
      tagline: '50+ Global & Indic Dialects',
      description: 'Trained on diverse acoustic datasets spanning Hindi, Tamil, Telugu, Bengali, Marathi, and international English accents without dialect bias.',
      icon: Globe2,
      metric: '50+',
      metricLabel: 'Languages & Dialects',
      badge: 'Pan-India Grounding'
    },
    {
      id: 'risk-scoring',
      title: 'Automated Risk Scoring',
      tagline: 'Policy Orchestration & Auto-Drop',
      description: 'Customizable corporate security policies: trigger silent dual-channel verification, push SOC escalation alerts, or auto-drop fraudulent calls.',
      icon: ShieldCheck,
      metric: '0-100',
      metricLabel: 'Calibrated Threat Index',
      badge: 'Policy Engine'
    }
  ];

  return (
    <section id="features" className="py-20 sm:py-24 relative overflow-hidden bg-[#040714]">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
            <span>ENTERPRISE SPECIFICATIONS</span>
            <span aria-hidden="true">·</span>
            <span>BUILT FOR MISSION CRITICAL TELEPHONY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive Defense Capabilities
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Engineered from foundational signal processing mathematics to defeat state-of-the-art generative voice synthesis models.
          </p>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="group relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/30"
              >
                <div className="space-y-4">
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {feat.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-cyan-400 font-medium mt-0.5 font-mono">
                      {feat.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Quantitative Metric Bar */}
                <div className="pt-4 border-t border-slate-800/80 flex items-baseline justify-between">
                  <div className="font-mono">
                    <div className="text-lg font-extrabold text-white group-hover:text-cyan-300 transition-colors tabular-nums">
                      {feat.metric}
                    </div>
                    <div className="text-[10px] text-slate-500">{feat.metricLabel}</div>
                  </div>
                  <div className="text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
