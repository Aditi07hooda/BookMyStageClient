import React from "react";
import FinalCTA from "./FinalCTA";
import PrivacySection from "./PrivacySection";
import ReceiveSection from "./ReceiveSection";
import AgeCategories from "./AgeCategories";
import StepsSection from "./StepsSection";
import HeroSection from "./HeroSection";
import "./howItWorks.scss";

const HowItWorks: React.FC = () => {
  return (
    <>
      <HeroSection />
      <StepsSection />
      <AgeCategories />
      <ReceiveSection />
      <PrivacySection />
      <FinalCTA />
    </>
  );
};

export default HowItWorks;