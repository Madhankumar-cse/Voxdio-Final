/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MouseGlow from './components/MouseGlow';
import ScrollProgressBar from './components/ScrollProgressBar';
import VideoModal from './components/VideoModal';
import WhitepaperModal from './components/WhitepaperModal';
import HeroSection from './sections/HeroSection';
import LiveDemoSection from './sections/LiveDemoSection';
import RiskDashboardSection from './sections/RiskDashboardSection';
import HowItWorksSection from './sections/HowItWorksSection';
import FeaturesSection from './sections/FeaturesSection';
import TechnologySection from './sections/TechnologySection';
import IndustrySolutionsSection from './sections/IndustrySolutionsSection';
import ComparisonSection from './sections/ComparisonSection';
import SecuritySection from './sections/SecuritySection';
import ResearchSection from './sections/ResearchSection';
import TeamSection from './sections/TeamSection';
import ContactSection from './sections/ContactSection';
import { ResearchTopic } from './types';

export default function App() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedWhitepaper, setSelectedWhitepaper] = useState<ResearchTopic | null>(null);

  const handleScrollToDemo = () => {
    const el = document.getElementById('demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050816] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Interactive cursor glow & scroll progress */}
      <MouseGlow />
      <ScrollProgressBar />

      {/* Top Navigation */}
      <Navbar onOpenVideo={() => setIsVideoModalOpen(true)} />

      {/* Main Content Flow */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <HeroSection
          onTryDemo={handleScrollToDemo}
          onWatchVideo={() => setIsVideoModalOpen(true)}
        />

        {/* 2. Interactive Live Demo Sandbox */}
        <LiveDemoSection />

        {/* 3. SecOps Risk Analytics Dashboard */}
        <RiskDashboardSection />

        {/* 4. 5-Step How It Works Pipeline */}
        <HowItWorksSection />

        {/* 5. Core Enterprise Capabilities & Features */}
        <FeaturesSection />

        {/* 6. High-Performance Technology & Architecture */}
        <TechnologySection />

        {/* 7. Tailored Industry Solutions */}
        <IndustrySolutionsSection />

        {/* 8. Benchmark Comparison */}
        <ComparisonSection />

        {/* 9. Carrier-Grade Security Architecture */}
        <SecuritySection />

        {/* 10. Peer-Reviewed Acoustic & DL Research */}
        <ResearchSection onOpenWhitepaper={(topic) => setSelectedWhitepaper(topic)} />

        {/* 11. Team RETRYAVENGERS (SIH 2026) */}
        <TeamSection />

        {/* 12. Validated Enterprise Contact & Pilot Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <WhitepaperModal
        topic={selectedWhitepaper}
        onClose={() => setSelectedWhitepaper(null)}
      />
    </div>
  );
}
