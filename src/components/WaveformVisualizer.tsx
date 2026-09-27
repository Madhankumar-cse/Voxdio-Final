import { useEffect, useRef, useState } from 'react';
import { Activity, BarChart2, Radio } from 'lucide-react';

interface WaveformVisualizerProps {
  isAnalyzing: boolean;
  isRecording: boolean;
  audioContext?: AudioContext | null;
  audioSourceNode?: AudioNode | null;
  accentColor?: 'cyan' | 'blue' | 'purple' | 'danger' | 'success';
}

export default function WaveformVisualizer({
  isAnalyzing,
  isRecording,
  accentColor = 'cyan'
}: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [viewMode, setViewMode] = useState<'wave' | 'frequency' | 'spectrogram'>('wave');
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Dark background with slight trace persistence
      ctx.fillStyle = 'rgba(5, 8, 22, 0.45)';
      ctx.fillRect(0, 0, width, height);

      // Grid guidelines
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      // Horizontal center line
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      // Vertical markers
      for (let x = 0; x < width; x += 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      ctx.stroke();

      const activeColor =
        accentColor === 'danger'
          ? '#EF4444'
          : accentColor === 'success'
          ? '#22C55E'
          : accentColor === 'purple'
          ? '#8B5CF6'
          : accentColor === 'blue'
          ? '#3B82F6'
          : '#06B6D4';

      if (viewMode === 'wave') {
        // Multi-frequency oscilloscope waveform
        const numWaves = 3;
        for (let w = 0; w < numWaves; w++) {
          ctx.beginPath();
          const alpha = 1 - w * 0.3;
          ctx.strokeStyle = activeColor;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = w === 0 ? 2.5 : 1.2;

          for (let x = 0; x < width; x += 2) {
            const freqMultiplier = isAnalyzing || isRecording ? 0.03 + w * 0.015 : 0.01 + w * 0.005;
            const ampMultiplier = isAnalyzing || isRecording ? 45 - w * 8 : 12 - w * 2;
            const noise = (Math.sin(x * 0.2 + phase * 2) + Math.cos(x * 0.08 - phase)) * (isRecording ? 10 : 2);

            const y =
              height / 2 +
              Math.sin(x * freqMultiplier + phase + w * 1.2) * ampMultiplier +
              Math.cos(x * (freqMultiplier * 0.5) - phase) * (ampMultiplier * 0.5) +
              noise;

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      } else if (viewMode === 'frequency') {
        // 32-band frequency spectrum equalizer
        const bars = 48;
        const barWidth = (width / bars) - 2;

        for (let i = 0; i < bars; i++) {
          const x = i * (barWidth + 2);
          const dynamicFactor = isAnalyzing || isRecording ? 1 : 0.25;
          const barHeight =
            (Math.sin(i * 0.25 + phase * 2) * 0.5 + 0.5) *
            (Math.cos(i * 0.15 - phase) * 0.5 + 0.5) *
            (height * 0.8) * dynamicFactor + 6;

          const gradient = ctx.createLinearGradient(0, height - barHeight, 0, height);
          gradient.addColorStop(0, activeColor);
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');

          ctx.fillStyle = gradient;
          ctx.fillRect(x, height - barHeight, barWidth, barHeight);

          // Peak cap
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(x, height - barHeight - 2, barWidth, 2);
        }
      } else {
        // Spectrogram heat matrix
        const cols = 28;
        const rows = 12;
        const cellW = width / cols;
        const cellH = height / rows;

        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            const intensity =
              (Math.sin(c * 0.3 + r * 0.4 + phase * 1.5) * 0.5 + 0.5) *
              (isAnalyzing ? 1 : 0.4);

            if (intensity > 0.4) {
              ctx.fillStyle =
                intensity > 0.8
                  ? activeColor
                  : intensity > 0.6
                  ? 'rgba(59, 130, 246, 0.6)'
                  : 'rgba(139, 92, 246, 0.3)';
              ctx.fillRect(c * cellW + 1, r * cellH + 1, cellW - 2, cellH - 2);
            }
          }
        }
      }

      phase += isAnalyzing ? 0.08 : isRecording ? 0.06 : 0.02;
      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isAnalyzing, isRecording, viewMode, accentColor]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 bg-[#070b1c]/90">
      {/* Top control bar inside visualizer */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800/80 bg-slate-900/60 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isRecording ? 'bg-red-400' : isAnalyzing ? 'bg-cyan-400' : 'bg-emerald-400'} opacity-75`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isRecording ? 'bg-red-500' : isAnalyzing ? 'bg-cyan-500' : 'bg-emerald-500'}`} />
          </span>
          <span className="font-mono uppercase text-[11px] text-slate-300">
            {isRecording ? 'LIVE MIC CAPTURE (48kHz)' : isAnalyzing ? 'NEURAL DSP EXTRACTION' : 'ACOUSTIC SENSOR STANDBY'}
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-800/70 p-0.5 rounded-lg border border-slate-700/50">
          <button
            onClick={() => setViewMode('wave')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${viewMode === 'wave' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'}`}
            title="Oscilloscope Waveform"
          >
            <Activity className="w-3 h-3" />
            <span className="hidden sm:inline">Waveform</span>
          </button>
          <button
            onClick={() => setViewMode('frequency')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${viewMode === 'frequency' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'}`}
            title="Frequency Spectrum"
          >
            <BarChart2 className="w-3 h-3" />
            <span className="hidden sm:inline">Spectrum</span>
          </button>
          <button
            onClick={() => setViewMode('spectrogram')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${viewMode === 'spectrogram' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'}`}
            title="Time-Frequency Spectrogram"
          >
            <Radio className="w-3 h-3" />
            <span className="hidden sm:inline">Matrix</span>
          </button>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={720}
        height={180}
        className="w-full h-44 sm:h-48 block"
      />
    </div>
  );
}
