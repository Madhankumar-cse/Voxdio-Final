# VOXDIO AI — Enterprise Deployment Guide

## 1. Architecture Overview

VOXDIO AI can be deployed in three modes:
1. **Cloud Multi-Tenant (Kubernetes)**: High-scale microservices processing distributed WebRTC and SIP traffic.
2. **On-Premise Private Cloud**: Dedicated financial / governmental datacenter instances.
3. **Air-Gapped Sovereign Node**: Complete offline deployment with zero outbound internet telemetry.

---

## 2. Quickstart with Docker Compose

```yaml
version: '3.8'

services:
  voxdio-web:
    image: voxdio/web:latest
    ports:
      - "3000:3000"
    environment:
      - VITE_API_ENDPOINT=http://voxdio-api:8000
    depends_on:
      - voxdio-api

  voxdio-api:
    image: voxdio/fastapi-engine:latest
    ports:
      - "8000:8000"
    environment:
      - MODEL_WEIGHTS_PATH=/models/conformer_res2net_quant.onnx
      - MAX_LATENCY_THRESHOLD_MS=180
      - WORKERS=8
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
```

Run cluster:
```bash
docker compose up -d --build
```

---

## 3. Inline SIP Trunk Carrier Configuration

VOXDIO connects with enterprise PBX servers (Asterisk, FreeSWITCH, Kamailio) using bidirectional RTP stream mirroring:

```lua
-- FreeSWITCH dialplan hook snippet
session:answer();
session:execute("record_session", "silence_stream://0");
session:execute("voxdio_inspect_stream", "rtp_mirror_target=10.0.1.50:5004 timeout=180ms");

local verdict = session:getVariable("VOXDIO_VERDICT");
if verdict == "AI_CLONE" then
    session:execute("playback", "ivr/call_security_violation.wav");
    session:hangup("CALL_REJECTED");
end
```

---

## 4. Privacy & Compliance Guarantees

- **Volatile Ring Buffers**: Audio frames remain strictly in memory and are discarded within 1,000ms after classification.
- **Zero Audio Storage**: No recordings are ever written to disk or transmitted to third-party endpoints.
- **Compliance Certifications**: Ready for ISO/IEC 27001, SOC 2 Type II, and India DPDP Act 2023.
