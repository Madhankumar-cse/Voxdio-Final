export type VoiceClassification = 'Human Voice' | 'AI Voice' | 'AI Clone';

export interface DetectionResult {
  voice_type: VoiceClassification;
  confidence: number; // e.g. 96%
  risk_score: number; // 0-100
  recommendation: string;
  probabilities: {
    human: number;
    ai_synthetic: number;
    voice_clone: number;
  };
  forensics: {
    mfcc_variance: number;
    phase_continuity: number;
    pitch_jitter_shimmer: number;
    spectral_flux: number;
    neural_vocoder_artifacts: number;
    prosodic_emotion_dissonance: number;
  };
  sample_info: {
    duration_seconds: number;
    sample_rate: number;
    channels: number;
    codec: string;
    file_name: string;
  };
  timestamp: string;
  session_id: string;
}

export interface AudioSampleItem {
  id: string;
  title: string;
  speaker: string;
  category: 'clone' | 'synthetic' | 'human';
  description: string;
  expectedResult: VoiceClassification;
  confidence: number;
  riskScore: number;
  recommendation: string;
  audioToneType: 'human_natural' | 'ai_elevenlabs' | 'clone_deepfake';
}

export interface TeamMember {
  name: string;
  role: string;
  focus: string;
  bio: string;
  avatar: string;
  github: string;
  linkedin: string;
}

export interface IndustrySolution {
  id: string;
  name: string;
  iconName: string;
  tagline: string;
  threatScenario: string;
  solution: string;
  impactMetric: string;
  metricLabel: string;
}

export interface ResearchTopic {
  id: string;
  title: string;
  category: string;
  abstract: string;
  methodology: string;
  benchmarkScore: string;
  readTime: string;
  citations: number;
}
