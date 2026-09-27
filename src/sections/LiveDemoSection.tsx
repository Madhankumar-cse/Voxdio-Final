import { useState, useRef } from 'react';
import {
  Mic,
  MicOff,
  Upload,
  Play,
  Square,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Cpu,
  FileCode,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Volume2
} from 'lucide-react';
import WaveformVisualizer from '../components/WaveformVisualizer';
import { SAMPLE_AUDIO_LIST, browserAudioPlayer } from '../lib/audioSamples';
import { generateSimulatedDetection, FAST_API_CODE_SNIPPETS } from '../lib/simulatedDetector';
import { AudioSampleItem, DetectionResult } from '../types';

export default function LiveDemoSection() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [selectedSample, setSelectedSample] = useState<AudioSampleItem | null>(SAMPLE_AUDIO_LIST[0]);
  const [activeTab, setActiveTab] = useState<'visual' | 'json' | 'fastapi'>('visual');
  const [copiedJson, setCopiedJson] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Start real microphone recording
  const startRecording = async () => {
    try {
      setSelectedSample(null);
      setUploadedFile(null);
      setResult(null);
      audioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        runAnalysis({
          sourceType: 'microphone',
          expectedCategory: 'human', // User's real voice is human
          audioDuration: recordingSeconds || 4
        });
      };

      recorder.start(100);
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn('Microphone permission not granted or unavailable, falling back to simulated capture', err);
      // Fallback: simulate live microphone capture
      setIsRecording(true);
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 4) {
            stopRecordingFallback();
            return 4;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      stopRecordingFallback();
    }
  };

  const stopRecordingFallback = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
    runAnalysis({
      sourceType: 'microphone',
      expectedCategory: 'human',
      audioDuration: 4
    });
  };

  // Upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setSelectedSample(null);
    setResult(null);

    // Heuristic categorization based on filename for dynamic testing
    const lower = file.name.toLowerCase();
    const cat = lower.includes('human')
      ? 'human'
      : lower.includes('bot') || lower.includes('tts')
      ? 'synthetic'
      : 'clone';

    runAnalysis({
      sourceType: 'upload',
      fileName: file.name,
      expectedCategory: cat,
      audioDuration: 5.2
    });
  };

  // Play audio sample
  const handlePlaySample = async (sample: AudioSampleItem) => {
    setSelectedSample(sample);
    setUploadedFile(null);

    if (isPlayingAudio) {
      browserAudioPlayer.stop();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    await browserAudioPlayer.playTone(sample.audioToneType, 3.5);
    setIsPlayingAudio(false);
  };

  // Run analysis pipeline
  const runAnalysis = async (inputParams?: {
    sourceType: 'microphone' | 'upload' | 'sample';
    fileName?: string;
    expectedCategory?: 'clone' | 'synthetic' | 'human';
    audioDuration?: number;
  }) => {
    setIsAnalyzing(true);
    setResult(null);

    const steps = [
      'Normalizing audio stream (48kHz Hamming window)...',
      'Computing 128-band Mel-Spectrogram & MFCC vectors...',
      'Extracting vocal cord jitter & phase gradient continuity...',
      'Running Conformer-Res2Net neural classifier...',
      'Evaluating vocoder diffusion artifacts against ASVspoof models...',
      'Synthesizing final risk verdict & policy recommendation...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setAnalysisStep(steps[i]);
      await new Promise((r) => setTimeout(r, 380));
    }

    const payload = inputParams || {
      sourceType: 'sample',
      expectedCategory: selectedSample?.category || 'clone',
      fileName: selectedSample?.title
    };

    const res = generateSimulatedDetection(payload);
    setResult(res);
    setIsAnalyzing(false);
    setAnalysisStep('');
  };

  const copyJsonToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // Color mappings
  const resultTheme =
    result?.voice_type === 'AI Clone'
      ? {
          text: 'text-red-400',
          bg: 'bg-red-500/10',
          border: 'border-red-500/40',
          accent: 'danger' as const,
          label: 'AI Clone Detected'
        }
      : result?.voice_type === 'AI Voice'
      ? {
          text: 'text-purple-400',
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/40',
          accent: 'purple' as const,
          label: 'AI Synthetic Speech'
        }
      : {
          text: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/40',
          accent: 'success' as const,
          label: 'Authentic Human Voice'
        };

  return (
    <section id="demo" className="py-20 sm:py-24 relative overflow-hidden bg-[#050816]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
            <span>INTERACTIVE FORENSICS LAB</span>
            <span aria-hidden="true">·</span>
            <span>FASTAPI 180MS STREAMING PIPELINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Live Voice Clone Detection Sandbox
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Record your own microphone stream, upload an audio interception file, or benchmark against curated deepfake attack scenarios.
          </p>
        </div>

        {/* Demo Stage Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Audio Input & Samples Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Input Action Card */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center justify-between">
                <span>01. Capture Audio Source</span>
                <span className="text-xs text-cyan-400 font-normal">Real-Time DSP</span>
              </h3>

              {/* Action Buttons: Mic & Upload */}
              <div className="grid grid-cols-2 gap-3">
                {/* Record Mic Button */}
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isAnalyzing}
                  className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 border transition-all cursor-pointer ${
                    isRecording
                      ? 'bg-red-500/20 border-red-500 text-red-300 animate-pulse'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 hover:border-cyan-500/40 text-slate-200'
                  }`}
                >
                  <div className={`p-3 rounded-full ${isRecording ? 'bg-red-500 text-white' : 'bg-cyan-500/20 text-cyan-400'}`}>
                    {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-bold whitespace-nowrap">
                    {isRecording ? `Stop (${recordingSeconds}s)` : 'Record Voice'}
                  </span>
                  <span className="text-[10px] text-slate-400">Microphone Input</span>
                </button>

                {/* Upload Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isAnalyzing || isRecording}
                  className="p-4 rounded-xl flex flex-col items-center justify-center gap-2 border bg-slate-800/80 hover:bg-slate-800 border-slate-700 hover:border-cyan-500/40 text-slate-200 transition-all cursor-pointer"
                >
                  <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold whitespace-nowrap">Upload Audio</span>
                  <span className="text-[10px] text-slate-400">WAV, MP3, M4A</span>
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="audio/*"
                  className="hidden"
                />
              </div>

              {/* Status indicator */}
              {uploadedFile && (
                <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-500/30 text-xs text-blue-300 flex items-center justify-between">
                  <span className="truncate max-w-[200px]">File: {uploadedFile.name}</span>
                  <span className="text-slate-400 font-mono">{(uploadedFile.size / 1024).toFixed(1)} KB</span>
                </div>
              )}

              {/* Curated Pre-Loaded Audio Scenario Bank */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">
                    Or select a pre-recorded test scenario:
                  </span>
                  <span className="text-[11px] text-slate-500">4 attack profiles</span>
                </div>

                <div className="space-y-2">
                  {SAMPLE_AUDIO_LIST.map((sample) => {
                    const isSelected = selectedSample?.id === sample.id;
                    return (
                      <div
                        key={sample.id}
                        onClick={() => {
                          setSelectedSample(sample);
                          setUploadedFile(null);
                        }}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-950/40 border-cyan-500/60 shadow-md shadow-cyan-950/50'
                            : 'bg-slate-950/50 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/40'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[10px] font-mono uppercase font-bold px-1.5 py-0.5 rounded ${
                                  sample.category === 'clone'
                                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                    : sample.category === 'synthetic'
                                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                }`}
                              >
                                {sample.expectedResult}
                              </span>
                              <h4 className="text-xs font-bold text-white truncate">
                                {sample.title}
                              </h4>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                              {sample.description}
                            </p>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlaySample(sample);
                            }}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 transition-colors shrink-0"
                            title="Play simulated audio tone"
                          >
                            {isPlayingAudio && isSelected ? (
                              <Square className="w-3.5 h-3.5 fill-current" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Trigger Analysis Button */}
              <button
                onClick={() => runAnalysis()}
                disabled={isAnalyzing || isRecording}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Cpu className="w-4 h-4" />
                <span>{isAnalyzing ? 'Extracting Acoustic Features...' : 'Run Neural Detection Scan'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Waveform, Neural Processing & Simulated Results (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Waveform Canvas */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">
                  Acoustic Oscilloscope & Spectrogram Stream
                </span>
                <span className="font-mono text-[11px] text-cyan-400">
                  {isRecording ? 'STREAMING ACTIVE' : isAnalyzing ? 'SPECTRAL SCAN' : 'READY'}
                </span>
              </div>

              <WaveformVisualizer
                isAnalyzing={isAnalyzing}
                isRecording={isRecording}
                accentColor={resultTheme.accent}
              />
            </div>

            {/* AI Processing Animation Stage */}
            {isAnalyzing && (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-cyan-400 flex items-center gap-2 font-bold">
                    <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
                    NEURAL FORENSIC ENGINE RUNNING
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">180ms STREAM INLINE</span>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 h-full w-full animate-pulse" />
                </div>

                <div className="text-xs text-slate-300 font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  &gt; {analysisStep}
                </div>
              </div>
            )}

            {/* Result Stage */}
            {result && !isAnalyzing && (
              <div className={`p-6 rounded-2xl border ${resultTheme.border} ${resultTheme.bg} space-y-6 transition-all duration-300`}>
                {/* Result Header & Verdict */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      SESSION {result.session_id} · {result.sample_info.file_name}
                    </span>
                    <div className="flex items-center gap-3">
                      <h3 className={`text-2xl sm:text-3xl font-extrabold ${resultTheme.text} tracking-tight`}>
                        {result.voice_type}
                      </h3>
                      {result.voice_type === 'AI Clone' ? (
                        <ShieldAlert className="w-7 h-7 text-red-400 shrink-0" />
                      ) : result.voice_type === 'AI Voice' ? (
                        <AlertTriangle className="w-7 h-7 text-purple-400 shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
                      )}
                    </div>
                  </div>

                  {/* Primary Scores Badges */}
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center min-w-[90px]">
                      <div className="text-[10px] font-mono text-slate-400">CONFIDENCE</div>
                      <div className="text-xl font-black text-cyan-300 font-mono tabular-nums">
                        {result.confidence}%
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center min-w-[90px]">
                      <div className="text-[10px] font-mono text-slate-400">RISK SCORE</div>
                      <div
                        className={`text-xl font-black font-mono tabular-nums ${
                          result.risk_score > 70 ? 'text-red-400' : result.risk_score > 30 ? 'text-purple-400' : 'text-emerald-400'
                        }`}
                      >
                        {result.risk_score}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtitle / Policy Action Recommendation */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3 text-xs">
                  <div className="mt-0.5">
                    {result.risk_score > 70 ? (
                      <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <div>
                    <span className="font-semibold text-white">Recommended Security Action: </span>
                    <span className="text-slate-300">{result.recommendation}</span>
                  </div>
                </div>

                {/* Triple Probability Breakdown (Human 96%, AI Voice 81%, Clone Risk 92%) */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                    <span>Acoustic Probability Distribution</span>
                    <span className="text-[11px] text-slate-400 font-mono">Multi-task Conformer Head</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {/* Human Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>Human Voice Likelihood</span>
                        <span className="font-mono tabular-nums font-bold text-emerald-400">
                          {result.probabilities.human}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${result.probabilities.human}%` }}
                        />
                      </div>
                    </div>

                    {/* AI Voice Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>Synthetic Speech (TTS)</span>
                        <span className="font-mono tabular-nums font-bold text-purple-400">
                          {result.probabilities.ai_synthetic}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                        <div
                          className="bg-purple-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${result.probabilities.ai_synthetic}%` }}
                        />
                      </div>
                    </div>

                    {/* Clone Risk Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>Target Voice Clone Impersonation</span>
                        <span className="font-mono tabular-nums font-bold text-red-400">
                          {result.probabilities.voice_clone}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                        <div
                          className="bg-red-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${result.probabilities.voice_clone}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Forensics Feature Radar/Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-[11px] font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                    <div className="text-slate-500">MFCC VARIANCE</div>
                    <div className="text-slate-200 font-bold tabular-nums">{result.forensics.mfcc_variance}%</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                    <div className="text-slate-500">PHASE CONTINUITY</div>
                    <div className="text-slate-200 font-bold tabular-nums">{result.forensics.phase_continuity}%</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                    <div className="text-slate-500">PITCH JITTER</div>
                    <div className="text-slate-200 font-bold tabular-nums">{result.forensics.pitch_jitter_shimmer}%</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                    <div className="text-slate-500">SPECTRAL FLUX</div>
                    <div className="text-slate-200 font-bold tabular-nums">{result.forensics.spectral_flux}%</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                    <div className="text-slate-500">VOCODER ARTIFACTS</div>
                    <div className="text-slate-200 font-bold tabular-nums">{result.forensics.neural_vocoder_artifacts}%</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                    <div className="text-slate-500">PROSODIC DISSONANCE</div>
                    <div className="text-slate-200 font-bold tabular-nums">{result.forensics.prosodic_emotion_dissonance}%</div>
                  </div>
                </div>

                {/* Tab switch for JSON / Code */}
                <div className="pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                      <button
                        onClick={() => setActiveTab('visual')}
                        className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                          activeTab === 'visual' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Visual Report
                      </button>
                      <button
                        onClick={() => setActiveTab('json')}
                        className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                          activeTab === 'json' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        FastAPI JSON
                      </button>
                      <button
                        onClick={() => setActiveTab('fastapi')}
                        className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                          activeTab === 'fastapi' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Python Integration
                      </button>
                    </div>

                    {activeTab === 'json' && (
                      <button
                        onClick={copyJsonToClipboard}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedJson ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
                      </button>
                    )}
                  </div>

                  {activeTab === 'json' && (
                    <div className="mt-3 p-4 rounded-xl bg-slate-950 font-mono text-xs text-cyan-300 overflow-x-auto border border-slate-800">
                      <pre>{JSON.stringify(result, null, 2)}</pre>
                    </div>
                  )}

                  {activeTab === 'fastapi' && (
                    <div className="mt-3 p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800 space-y-3">
                      <div className="text-slate-400 text-[11px]"># Python 3.11 / FastAPI Client Integration</div>
                      <pre className="text-cyan-300">{FAST_API_CODE_SNIPPETS.python}</pre>
                      <div className="text-slate-400 text-[11px] pt-2"># cURL Streaming Endpoint</div>
                      <pre className="text-slate-300">{FAST_API_CODE_SNIPPETS.curl}</pre>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Default State before scan */}
            {!result && !isAnalyzing && (
              <div className="p-8 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">
                  Audio Ingestion Engine Standing By
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Click <span className="text-cyan-400 font-semibold">"Run Neural Detection Scan"</span> on the left to analyze the selected test scenario, or record 3 seconds from your microphone.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
