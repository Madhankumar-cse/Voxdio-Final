export interface ThreatIncident {
  id: string;
  timestamp: string;
  sourceChannel: string;
  threatType: 'AI Clone' | 'Synthetic TTS' | 'Vishing Bot' | 'Authentic Voice';
  targetEntity: string;
  riskScore: number;
  status: 'BLOCKED' | 'TERMINATED' | 'CHALLENGED' | 'VERIFIED';
}

export const RECENT_INCIDENTS: ThreatIncident[] = [
  {
    id: 'INC-8891',
    timestamp: 'Just now',
    sourceChannel: 'SIP Trunk 04 (Banking PBX)',
    threatType: 'AI Clone',
    targetEntity: 'Treasury Wire Desk',
    riskScore: 98,
    status: 'TERMINATED'
  },
  {
    id: 'INC-8890',
    timestamp: '2 min ago',
    sourceChannel: 'VoIP Inbound Line 12',
    threatType: 'Synthetic TTS',
    targetEntity: 'KYC Verification Gateway',
    riskScore: 84,
    status: 'BLOCKED'
  },
  {
    id: 'INC-8889',
    timestamp: '6 min ago',
    sourceChannel: 'WebRTC Customer App',
    threatType: 'Authentic Voice',
    targetEntity: 'Retail Banking User #9421',
    riskScore: 3,
    status: 'VERIFIED'
  },
  {
    id: 'INC-8888',
    timestamp: '14 min ago',
    sourceChannel: 'Cellular Carrier Gateway',
    threatType: 'AI Clone',
    targetEntity: 'Executive Board Member',
    riskScore: 95,
    status: 'TERMINATED'
  },
  {
    id: 'INC-8887',
    timestamp: '22 min ago',
    sourceChannel: 'IVR Emergency Dispatch',
    threatType: 'Vishing Bot',
    targetEntity: '911 State Public Safety',
    riskScore: 91,
    status: 'BLOCKED'
  }
];

export const HOURLY_TIMELINE_DATA = {
  labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', 'Now'],
  scannedCalls: [4200, 3100, 5800, 14200, 19800, 22400, 18900, 13400, 16800],
  clonesBlocked: [14, 8, 22, 118, 164, 189, 142, 98, 132]
};

export const THREAT_DISTRIBUTION_DATA = {
  labels: ['Authentic Human', 'AI Voice Clones', 'Synthetic TTS Bots', 'Manipulated Audio'],
  values: [74, 13, 9, 4]
};

export const ATTACK_VECTORS_DATA = {
  labels: ['Executive Whaling', 'Banking KYC Spoof', 'Family Emergency', 'Robocall Vishing', 'Helpdesk Reset'],
  interceptedCounts: [482, 934, 612, 1240, 395]
};
