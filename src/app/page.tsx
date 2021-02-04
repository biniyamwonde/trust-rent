import React from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import PromotionsSection from '@/components/PromotionsSection';
import RewardsSection from '@/components/RewardsSection';
import PrivacySection from '@/components/PrivacySection';
import FinalCTASection from '@/components/FinalCTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroBanner />
      <PromotionsSection />
      <RewardsSection />
      <PrivacySection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
// TODO: Review implementation
