import React from "react";

import FeaturesHero from "../components/Features/FeaturesHero";
import KeyFeatures from "../components/Features/KeyFeatures";
import FeatureShowcase from "../components/Features/FeatureShowcase";
import FeaturesCTA from "../components/Features/FeaturesCTA";
import FeaturesFooter from "../components/Features/FeaturesFooter";

function Features() {
  return (
    <main className="w-full overflow-hidden bg-white">
      <FeaturesHero />

      <KeyFeatures />

      <FeatureShowcase />

      <FeaturesCTA />

      <FeaturesFooter />
    </main>
  );
}

export default Features;