import { AudioSampleItem } from '../types';

export const SAMPLE_AUDIO_LIST: AudioSampleItem[] = [
  {
    id: 'clone-ceo-wire',
    title: 'Emergency Wire Transfer Authorization',
    speaker: 'CEO Impersonation (Cloned Voice)',
    category: 'clone',
    description: 'High-fidelity zero-shot voice clone replicating executive voice with urgent tone targeting treasury finance desk.',
    expectedResult: 'AI Clone',
    confidence: 94,
    riskScore: 98,
    recommendation: 'Terminate the call immediately. Trigger high-priority SOC alert #VC-9912.',
    audioToneType: 'clone_deepfake'
  },
  {
    id: 'deepfake-grandchild',
    title: 'Family Distress Emergency Spoof',
    speaker: 'Grandchild Voice Clone',
    category: 'clone',
    description: 'Voice clone scraped from 15-second social media reel, mimicking crying vocal strain to scam elderly grandparents.',
    expectedResult: 'AI Clone',
    confidence: 91,
    riskScore: 95,
    recommendation: 'Potential social engineering spoof detected. Require secondary offline channel callback.',
    audioToneType: 'clone_deepfake'
  },
  {
    id: 'synthetic-telemarketing',
    title: 'Autonomous Bank KYC Verification Bot',
    speaker: 'Text-to-Speech Neural Vocoder',
    category: 'synthetic',
    description: 'Ultra-smooth synthetic voice bot calling to harvest one-time SMS passcodes and banking credentials.',
    expectedResult: 'AI Voice',
    confidence: 88,
    riskScore: 82,
    recommendation: 'Synthetic bot detected. Inbound caller blocked from automated IVR routing.',
    audioToneType: 'ai_elevenlabs'
  },
  {
    id: 'authentic-support-rep',
    title: 'Customer Support Human Operator',
    speaker: 'Authentic Human Employee',
    category: 'human',
    description: 'Natural human conversation featuring organic vocal cord micro-tremors, spontaneous breathing, and room acoustics.',
    expectedResult: 'Human Voice',
    confidence: 97,
    riskScore: 4,
    recommendation: 'Biometric verification passed. Authentic human speech verified with 99.4% acoustic integrity.',
    audioToneType: 'human_natural'
  }
];

/**
 * Web Audio API synthesizer that generates realistic audio waveforms for testing
 * so users can hear live audio and watch real-time frequency oscillations!
 */
class BrowserAudioPlayer {
  private ctx: AudioContext | null = null;
  private currentSource: AudioNode | null = null;
  private isPlaying = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getContext(): AudioContext {
    this.initCtx();
    return this.ctx!;
  }

  public playTone(type: 'human_natural' | 'ai_elevenlabs' | 'clone_deepfake', durationSec = 4): Promise<void> {
    this.stop();
    this.initCtx();
    const ctx = this.ctx!;
    this.isPlaying = true;

    return new Promise((resolve) => {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec);

      if (type === 'human_natural') {
        // Human formant resonance around 140Hz with micro-tremolo and gentle vocal timbre
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(130, ctx.currentTime);
        // Formant filter (vocal tract simulation)
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(750, ctx.currentTime);
        filter.Q.setValueAtTime(4, ctx.currentTime);

        // Sub formant
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(260, ctx.currentTime);

        // Vocal vibrato
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(5.2, ctx.currentTime);
        lfoGain.gain.setValueAtTime(3.5, ctx.currentTime);
        lfo.connect(osc1.frequency);
        lfo.start();
        setTimeout(() => { try { lfo.stop(); } catch {} }, durationSec * 1000);
      } else if (type === 'ai_elevenlabs') {
        // Robotic ultra-smooth neural vocoder buzz
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(220, ctx.currentTime);
        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(440, ctx.currentTime);
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1800, ctx.currentTime);
      } else {
        // Clone voice: Phase artifact chirps, high frequency robotic jitter
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(180, ctx.currentTime);
        osc1.frequency.linearRampToValueAtTime(210, ctx.currentTime + 1.2);
        osc1.frequency.linearRampToValueAtTime(175, ctx.currentTime + 2.5);

        osc2.type = 'square';
        osc2.frequency.setValueAtTime(360, ctx.currentTime);

        filter.type = 'peaking';
        filter.frequency.setValueAtTime(3200, ctx.currentTime);
        filter.gain.setValueAtTime(8, ctx.currentTime);
      }

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      this.currentSource = gain;

      setTimeout(() => {
        try {
          osc1.stop();
          osc2.stop();
        } catch {}
        this.isPlaying = false;
        resolve();
      }, durationSec * 1000);
    });
  }

  public stop() {
    if (this.currentSource) {
      try {
        this.currentSource.disconnect();
      } catch {}
      this.currentSource = null;
    }
    this.isPlaying = false;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const browserAudioPlayer = new BrowserAudioPlayer();
