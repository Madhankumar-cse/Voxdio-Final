import { Github, Linkedin, Mail, Shield, Code, Cpu, Server, ExternalLink } from 'lucide-react';
import { TeamMember } from '../types';

export default function TeamSection() {
  const teamMembers: TeamMember[] = [
    {
      name: 'Madhankumar V',
      role: 'Team Lead & AI Forensics Architect',
      focus: 'Phase Discontinuity Analysis & Conformer Neural Architecture',
      bio: 'Pioneered zero-shot voice clone discrimination through Short-Time Fourier Transform phase gradient extraction and multi-task loss optimization.',
      avatar: 'MV',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Adithya S',
      role: 'Full Stack & Real-Time DSP Engineer',
      focus: 'FastAPI Streaming WebSockets & Web Audio Signal Pipeline',
      bio: 'Specializes in high-frequency audio digital signal processing (DSP), C++ ONNX quantization, and sub-180ms responsive client telemetry interfaces.',
      avatar: 'AS',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Priyadharshini K',
      role: 'Deep Learning Security Researcher',
      focus: 'Acoustic Anti-Spoofing & Indic Multilingual Corpus',
      bio: 'Curated 50,000+ authentic and synthetic voice samples across 12 Indian regional dialects to eliminate algorithmic bias in vocal tract verification.',
      avatar: 'PK',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Rohan Sharma',
      role: 'Cloud & Enterprise Infrastructure Lead',
      focus: 'SIP Carrier Telephony Trunks & Air-Gapped Kubernetes',
      bio: 'Architected carrier-grade SIP proxy integration and high-throughput microservices capable of processing 10,000+ concurrent voice streams.',
      avatar: 'RS',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  ];

  return (
    <section id="team" className="py-20 sm:py-24 relative overflow-hidden bg-[#040613] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
            <span>SMART INDIA HACKATHON 2026 FINALISTS</span>
            <span aria-hidden="true">·</span>
            <span>TEAM RETRYAVENGERS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Meet Team RETRYAVENGERS
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            The engineers, mathematicians, and cyber security researchers behind VOXDIO AI's real-time voice clone defense engine.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between space-y-5 hover:-translate-y-1 group shadow-lg"
            >
              <div className="space-y-4">
                {/* Cyber Avatar Lockup */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <div className="w-full h-full bg-[#050816] rounded-2xl flex items-center justify-center text-white font-extrabold font-mono text-lg">
                      {member.avatar}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                    MEMBER 0{i + 1}
                  </span>
                </div>

                {/* Name & Role */}
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-cyan-400 mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 mt-1">
                    {member.focus}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-400 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              {/* Social Icons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  RETRYAVENGERS
                </span>
                <div className="flex items-center gap-2 text-slate-400">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-slate-950 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                    aria-label={`${member.name} GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-slate-950 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:madhankumarofficial007@gmail.com"
                    className="p-1.5 rounded-lg bg-slate-950 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hackathon Badge Callout */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-purple-950/40 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-cyan-400 uppercase font-semibold">
              <Shield className="w-4 h-4" />
              <span>Smart India Hackathon 2026 Submission</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Proudly Representing Innovation in National Cyber Security & AI Defense
            </h4>
            <p className="text-xs text-slate-300">
              Developed under the Ministry of Education & AICTE National Hackathon Initiative.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-cyan-300 bg-slate-950 px-4 py-2 rounded-xl border border-cyan-500/40">
              SIH-2026-FINALIST
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
