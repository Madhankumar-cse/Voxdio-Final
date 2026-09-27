import {
  Building2,
  Landmark,
  Radio,
  Briefcase,
  Headset,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function IndustrySolutionsSection() {
  const industries = [
    {
      id: 'banking',
      name: 'Banking & Financial Services',
      icon: Landmark,
      tagline: 'Defend Treasury & High-Value Wire Transfers',
      threatScenario:
        'Attackers deploy cloned voices of CEOs or CFOs over phone lines to trick treasury clerks into releasing emergency multimillion-dollar wire transfers.',
      solution:
        'VOXDIO AI installs inline on PBX trunks to verify vocal tract micro-tremors and acoustic phase continuity before high-value authorization completes.',
      impactMetric: '$14.2M+',
      metricLabel: 'Prevented in Wire Transfer Fraud',
      highlights: ['Wire transfer voice auth', 'Executive voice whitelisting', 'Instant SOC webhook alert']
    },
    {
      id: 'government',
      name: 'Government & Defense Comms',
      icon: ShieldCheck,
      tagline: 'Secure Tactical Dispatch & Public Safety',
      threatScenario:
        'State-sponsored actors and bad actors spoof public emergency dispatch 911 lines and military command frequencies with automated deepfake communications.',
      solution:
        'Air-gapped on-premise deployment verifying hardware radio transmission integrity and vocal tract acoustic authenticity under strict zero-trust standards.',
      impactMetric: '100% Air-Gapped',
      metricLabel: 'Compliant with Defense Standards',
      highlights: ['Classified comms encryption', 'Zero cloud telemetry option', 'Military tactical dispatch defense']
    },
    {
      id: 'telecom',
      name: 'Telecommunications Carriers',
      icon: Radio,
      tagline: 'Carrier-Grade SIP Trunk Deepfake Filtering',
      threatScenario:
        'Mass automated vishing operations flood cellular subscribers with synthesized robocalls claiming to be tax authorities or law enforcement agencies.',
      solution:
        'Deployed at carrier central offices and SIP gateways to inspect live audio streams at line rate, dropping synthetic calls before subscriber phones ring.',
      impactMetric: '99.8%',
      metricLabel: 'Automated Robocall Reduction',
      highlights: ['STIR/SHAKEN protocol synergy', 'Millions of concurrent streams', 'Sub-180ms line-rate filtering']
    },
    {
      id: 'enterprises',
      name: 'Enterprise Corporations',
      icon: Briefcase,
      tagline: 'Protection Against Executive Whaling Attacks',
      threatScenario:
        'Hackers scrape public YouTube interviews and earnings calls to clone the executive board, impersonating them in Slack audio or Zoom conference calls.',
      solution:
        'Browser extensions and corporate PBX listeners that score every internal audio conference and display real-time authenticity badges to all meeting participants.',
      impactMetric: '0.12%',
      metricLabel: 'False Positive Ratio',
      highlights: ['Zoom / Teams / Meet integration', 'Employee biometric protection', 'HR & payroll change verification']
    },
    {
      id: 'callcenters',
      name: 'Customer Service & Contact Centers',
      icon: Headset,
      tagline: 'Prevent Contact Center Social Engineering',
      threatScenario:
        'Fraudsters feed synthetic audio into customer care hotlines to reset account passwords, bypass SMS 2FA, and take over consumer banking portals.',
      solution:
        'Passive background voice biometrics that alerts human customer service representatives the instant synthetic frequency artifacts or TTS audio is detected.',
      impactMetric: '-72%',
      metricLabel: 'Account Takeover Incidents',
      highlights: ['Passive non-intrusive scanning', 'Agent desktop warning HUD', 'Automated caller risk scoring']
    }
  ];

  return (
    <section id="solutions" className="py-20 sm:py-24 relative overflow-hidden bg-[#040613]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
            <span>VERTICAL DEFENSE ARCHITECTURES</span>
            <span aria-hidden="true">·</span>
            <span>PROVEN AT SCALE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tailored Industry Solutions
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Real-world deployments mitigating voice clone impersonation across high-stakes financial, national security, and enterprise infrastructure.
          </p>
        </div>

        {/* 5 Industry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.id}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                      VERIFIED SECTOR
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {ind.name}
                    </h3>
                    <p className="text-xs text-cyan-400 font-medium mt-0.5">
                      {ind.tagline}
                    </p>
                  </div>

                  {/* Threat vs Solution */}
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 text-slate-300">
                      <span className="font-semibold text-red-400 block mb-1">Threat Vector:</span>
                      {ind.threatScenario}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-300">
                      <span className="font-semibold text-cyan-400 block mb-1">VOXDIO Shield:</span>
                      {ind.solution}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-1">
                    {ind.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact Metric Bottom */}
                <div className="pt-4 border-t border-slate-800/80 flex items-baseline justify-between">
                  <div className="font-mono">
                    <div className="text-xl font-extrabold text-white font-mono tabular-nums">
                      {ind.impactMetric}
                    </div>
                    <div className="text-[11px] text-slate-400">{ind.metricLabel}</div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Enterprise SecOps Command Center Image Feature */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#090f2b] to-[#040817] border border-cyan-500/30 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                GLOBAL TELEMETRY
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Unified SecOps Interception Engine
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect all carrier trunks, call centers, and executive devices into a single glass pane with automated SIEM integration (Splunk, Sentinel, QRadar).
              </p>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-800">
              <img
                src="/src/assets/images/enterprise_secops_1790501992097.jpg"
                alt="VOXDIO AI Enterprise Security Operations Center"
                referrerPolicy="no-referrer"
                className="w-full h-36 object-cover"
              />
            </div>

            <div className="pt-2 text-xs font-mono text-cyan-400 flex items-center justify-between">
              <span>FASTAPI TELEMETRY BUS</span>
              <span className="text-emerald-400">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
