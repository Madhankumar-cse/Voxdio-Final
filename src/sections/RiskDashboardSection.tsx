import { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import {
  ShieldAlert,
  Activity,
  CheckCircle,
  Radio,
  Clock,
  Filter,
  ArrowUpRight,
  TrendingDown,
  Layers,
  Terminal
} from 'lucide-react';
import { RECENT_INCIDENTS, HOURLY_TIMELINE_DATA, THREAT_DISTRIBUTION_DATA, ATTACK_VECTORS_DATA } from '../lib/dashboardData';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function RiskDashboardSection() {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'high' | 'blocked'>('all');

  const lineChartRef = useRef<HTMLCanvasElement | null>(null);
  const pieChartRef = useRef<HTMLCanvasElement | null>(null);
  const barChartRef = useRef<HTMLCanvasElement | null>(null);

  const lineChartInstance = useRef<ChartJS | null>(null);
  const pieChartInstance = useRef<ChartJS | null>(null);
  const barChartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    // 1. Line Chart: Real-time Ingestion & Clone Interceptions
    if (lineChartRef.current) {
      if (lineChartInstance.current) lineChartInstance.current.destroy();

      const ctx = lineChartRef.current.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 240);
        gradient.addColorStop(0, 'rgba(6, 182, 212, 0.35)');
        gradient.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

        lineChartInstance.current = new ChartJS(ctx, {
          type: 'line',
          data: {
            labels: HOURLY_TIMELINE_DATA.labels,
            datasets: [
              {
                label: 'Voice Streams Scanned',
                data: HOURLY_TIMELINE_DATA.scannedCalls,
                borderColor: '#3B82F6',
                backgroundColor: 'transparent',
                tension: 0.35,
                pointRadius: 3,
                pointBackgroundColor: '#3B82F6',
                borderWidth: 2
              },
              {
                label: 'AI Clones Neutralized',
                data: HOURLY_TIMELINE_DATA.clonesBlocked.map((v) => v * 80),
                borderColor: '#06B6D4',
                backgroundColor: gradient,
                fill: true,
                tension: 0.35,
                pointRadius: 4,
                pointBackgroundColor: '#06B6D4',
                borderWidth: 2
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 11 } }
              },
              tooltip: {
                backgroundColor: '#070b1e',
                borderColor: '#1e293b',
                borderWidth: 1,
                titleColor: '#f8fafc',
                bodyColor: '#cbd5e1'
              }
            },
            scales: {
              x: {
                grid: { color: 'rgba(30, 41, 59, 0.3)' },
                ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } }
              },
              y: {
                grid: { color: 'rgba(30, 41, 59, 0.3)' },
                ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } }
              }
            }
          }
        });
      }
    }

    // 2. Pie Chart: Threat Distribution
    if (pieChartRef.current) {
      if (pieChartInstance.current) pieChartInstance.current.destroy();

      const ctx = pieChartRef.current.getContext('2d');
      if (ctx) {
        pieChartInstance.current = new ChartJS(ctx, {
          type: 'doughnut',
          data: {
            labels: THREAT_DISTRIBUTION_DATA.labels,
            datasets: [
              {
                data: THREAT_DISTRIBUTION_DATA.values,
                backgroundColor: [
                  '#22C55E', // Authentic
                  '#EF4444', // Voice Clones
                  '#8B5CF6', // Synthetic TTS
                  '#F59E0B'  // Manipulated
                ],
                borderWidth: 2,
                borderColor: '#050816'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 11 }, padding: 12 }
              },
              tooltip: {
                backgroundColor: '#070b1e',
                borderColor: '#1e293b',
                borderWidth: 1
              }
            },
            cutout: '65%'
          }
        });
      }
    }

    // 3. Bar Chart: Threat Vectors
    if (barChartRef.current) {
      if (barChartInstance.current) barChartInstance.current.destroy();

      const ctx = barChartRef.current.getContext('2d');
      if (ctx) {
        barChartInstance.current = new ChartJS(ctx, {
          type: 'bar',
          data: {
            labels: ATTACK_VECTORS_DATA.labels,
            datasets: [
              {
                label: 'Interceptions Today',
                data: ATTACK_VECTORS_DATA.interceptedCounts,
                backgroundColor: 'rgba(59, 130, 246, 0.75)',
                hoverBackgroundColor: '#06B6D4',
                borderRadius: 6
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#070b1e',
                borderColor: '#1e293b',
                borderWidth: 1
              }
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: '#94a3b8', font: { size: 10 } }
              },
              y: {
                grid: { color: 'rgba(30, 41, 59, 0.3)' },
                ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } }
              }
            }
          }
        });
      }
    }

    return () => {
      if (lineChartInstance.current) lineChartInstance.current.destroy();
      if (pieChartInstance.current) pieChartInstance.current.destroy();
      if (barChartInstance.current) barChartInstance.current.destroy();
    };
  }, [timeRange]);

  const filteredIncidents = RECENT_INCIDENTS.filter((inc) => {
    if (severityFilter === 'high') return inc.riskScore > 90;
    if (severityFilter === 'blocked') return inc.status === 'TERMINATED' || inc.status === 'BLOCKED';
    return true;
  });

  return (
    <section id="dashboard" className="py-20 sm:py-24 relative overflow-hidden bg-[#040714] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              TELECOMMUNICATION SECOPS DASHBOARD
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real-Time Voice Risk Telemetry
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Carrier-grade SIP trunk interception and deepfake audio vector distribution across enterprise communications.
            </p>
          </div>

          {/* Time range tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
            {(['24h', '7d', '30d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  timeRange === range
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Last {range}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Primary Metric Cards: Live Detection, Threat Level, Voice Confidence, Security Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. Live Detection */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 hover:border-cyan-500/30 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>LIVE DETECTION</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-white font-mono tabular-nums">
                128,492
              </span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> +14.2%
              </span>
            </div>
            <div className="text-xs text-slate-400">
              Active SIP & WebRTC audio streams analyzed today.
            </div>
          </div>

          {/* 2. Threat Level */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 hover:border-red-500/30 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>THREAT LEVEL</span>
              <ShieldAlert className="w-4 h-4 text-red-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-red-400 font-mono">
                ELEVATED
              </span>
              <span className="text-xs font-mono text-slate-400">
                13.4% Spoof Ratio
              </span>
            </div>
            <div className="text-xs text-slate-400">
              1,240 automated synthetic audio probes neutralized.
            </div>
          </div>

          {/* 3. Voice Confidence */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 hover:border-blue-500/30 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>VOICE CONFIDENCE</span>
              <Radio className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-cyan-300 font-mono tabular-nums">
                99.4%
              </span>
              <span className="text-xs font-mono text-cyan-400">
                &lt; 0.12% FAR
              </span>
            </div>
            <div className="text-xs text-slate-400">
              Dual-branch Conformer neural confidence index.
            </div>
          </div>

          {/* 4. Security Status */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>SECURITY STATUS</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-emerald-400 font-mono">
                ENFORCING
              </span>
              <span className="text-xs text-slate-400 font-mono">
                164ms Inline
              </span>
            </div>
            <div className="text-xs text-slate-400">
              Auto-drop policy armed across all carrier trunks.
            </div>
          </div>
        </div>

        {/* 3 Analytics Charts: Line, Pie, Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Line Chart: Telemetry over time (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Audio Stream Telemetry & Interceptions
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time call volume versus mitigated zero-shot voice clones.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400">48kHz PCM</span>
            </div>

            <div className="h-64 w-full">
              <canvas ref={lineChartRef} />
            </div>
          </div>

          {/* Pie Chart: Threat Breakdown (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Acoustic Identity Distribution
              </h3>
              <p className="text-xs text-slate-400">
                Authentic human conversations vs synthetic & deepfake attacks.
              </p>
            </div>

            <div className="h-64 w-full flex items-center justify-center">
              <canvas ref={pieChartRef} />
            </div>
          </div>

          {/* Bar Chart: Attack Vector Breakdown (12 cols) */}
          <div className="lg:col-span-12 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Targeted Attack Vectors Neutralized Today
                </h3>
                <p className="text-xs text-slate-400">
                  Breakdown by corporate impersonation tactics and automated vishing campaigns.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Total Neutralized: 3,663 attacks
              </span>
            </div>

            <div className="h-56 w-full">
              <canvas ref={barChartRef} />
            </div>
          </div>
        </div>

        {/* Live Incident Stream Feed */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                Live PBX Carrier Incident Interceptions
              </h3>
              <p className="text-xs text-slate-400">
                Streaming forensic logs from enterprise SIP and WebRTC nodes.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Filter:</span>
              <button
                onClick={() => setSeverityFilter('all')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  severityFilter === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSeverityFilter('high')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  severityFilter === 'high' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                High Risk (&gt;90%)
              </button>
              <button
                onClick={() => setSeverityFilter('blocked')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  severityFilter === 'blocked' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Terminated Calls
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Incident ID</th>
                  <th className="py-2.5 px-3">Time</th>
                  <th className="py-2.5 px-3">Source Channel</th>
                  <th className="py-2.5 px-3">Threat Vector</th>
                  <th className="py-2.5 px-3">Target Endpoint</th>
                  <th className="py-2.5 px-3">Risk</th>
                  <th className="py-2.5 px-3">Action Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredIncidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 text-cyan-400 font-bold">{incident.id}</td>
                    <td className="py-3 px-3 text-slate-400">{incident.timestamp}</td>
                    <td className="py-3 px-3 text-slate-300 font-sans">{incident.sourceChannel}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          incident.threatType === 'AI Clone'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : incident.threatType === 'Synthetic TTS'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : incident.threatType === 'Authentic Voice'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                        }`}
                      >
                        {incident.threatType}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-sans">{incident.targetEntity}</td>
                    <td className="py-3 px-3 tabular-nums font-bold">
                      <span className={incident.riskScore > 80 ? 'text-red-400' : incident.riskScore > 30 ? 'text-yellow-400' : 'text-emerald-400'}>
                        {incident.riskScore}%
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          incident.status === 'TERMINATED'
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : incident.status === 'BLOCKED'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}
                      >
                        {incident.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
