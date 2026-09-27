# VOXDIO AI — AI-Powered Real-Time Voice Clone Detection

**Smart India Hackathon 2026 Finalist Project**  
**Team:** RETRYAVENGERS  
**Tagline:** *Trust Every Voice. Prevent Every Impersonation.*

---

## 📌 Executive Summary

VOXDIO AI is a carrier-grade cyber security platform designed to detect and neutralize AI-generated voices, zero-shot voice clones, and synthetic text-to-speech (TTS) deepfakes in real-time telecommunication streams.

Operating with an end-to-end latency budget of **< 180ms**, VOXDIO AI analyzes raw audio from telephony carrier SIP trunks and WebRTC connections, extracts 128-band Log-Mel filterbanks and phase gradient vectors, classifies the acoustic anomalies using a Conformer-Res2Net neural architecture, and enforces instantaneous call termination before financial fraud or credential interception can take place.

---

## 🚀 Key Features

- **Sub-180ms Inline Latency:** Inspects live 48kHz audio streams and computes risk verdicts mid-conversation.
- **Zero-Shot Voice Clone Discrimination:** Identifies clones created with commercial voice engines (ElevenLabs, Voicebox, XTTS) using STFT phase discontinuity analysis.
- **5-Step Forensic Pipeline:**
  1. Lossless Audio Ingestion (WebRTC / SIP Trunk)
  2. Feature Extraction (128-band Mel Spectrograms, CQCC, MFCC + Deltas)
  3. Acoustic Forensics (Sub-audible phase gradient and vocoder cutoff analysis)
  4. Conformer + Res2Net Deep Learning Classifier
  5. Real-Time Risk Score & Automated Policy Execution
- **Multi-Vertical Defense:** Tailored modules for Banking Treasury Wire Transfers, Telecom Carrier PBX filtering, Call Center KYC verification, and Defense tactical dispatch.
- **Interactive Sandbox & SecOps Dashboard:** Live microphone capture, sample attack benchmark player, Chart.js telemetry visualization, and FastAPI JSON response explorer.
- **Pan-India Multilingual Grounding:** Robust against 50+ languages and regional Indian accents without demographic acoustic bias.

---

## 🏗️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Tailwind CSS, Motion, Chart.js, Lucide Icons |
| **Backend** | FastAPI (Python 3.11), Uvicorn, Starlette Async Workers |
| **Deep Learning** | PyTorch, ONNX Runtime (FP16/INT8 Quantization), Torchaudio |
| **Digital Signal Processing** | Librosa, NumPy, SciPy (Short-Time Fourier Transform, CQCC, Wiener Filtering) |
| **Telephony Gateway** | WebRTC, SIP Trunking, FreeSWITCH / Asterisk Inline Hooks |

---

## 🔌 FastAPI Integration Example

### Endpoint: `POST /v1/voice/detect`

```bash
curl -X POST "https://api.voxdio.ai/v1/voice/detect" \
  -H "Authorization: Bearer vx_live_sih2026_prod" \
  -F "file=@intercepted_audio.wav" \
  -F "detection_profile=enterprise_high_security"
```

### JSON Response:

```json
{
  "voice_type": "AI Clone",
  "confidence": 94,
  "risk_score": 98,
  "recommendation": "Critical Impersonation Alert: Zero-shot voice clone detected. Terminate the call immediately.",
  "probabilities": {
    "human": 3,
    "ai_synthetic": 12,
    "voice_clone": 94
  },
  "forensics": {
    "mfcc_variance": 48.7,
    "phase_continuity": 28.3,
    "pitch_jitter_shimmer": 4.8,
    "spectral_flux": 84.9,
    "neural_vocoder_artifacts": 94.2,
    "prosodic_emotion_dissonance": 91.7
  },
  "sample_info": {
    "duration_seconds": 4.2,
    "sample_rate": 48000,
    "channels": 1,
    "codec": "PCM_F32LE / Opus HD"
  }
}
```

---

## 👥 Team RETRYAVENGERS

- **Madhankumar V** — Team Lead & AI Forensics Architect
- **Adithya S** — Full Stack & Real-Time DSP Engineer
- **Priyadharshini K** — Deep Learning Security Researcher
- **Rohan Sharma** — Cloud & Enterprise Infrastructure Lead

---

## 📜 License

Developed for **Smart India Hackathon 2026**. All rights reserved by Team RETRYAVENGERS.
