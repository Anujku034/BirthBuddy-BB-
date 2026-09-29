import React from "react";

import HowItWorksHero from "../components/HowItWorks/HowItWorksHero";
import ProcessSteps from "../components/HowItWorks/ProcessSteps";
import HowItWorksShowcase from "../components/HowItWorks/HowItWorksShowcase";
import HowItWorksCTA from "../components/HowItWorks/HowItWorksCTA";
import HowItWorksFooter from "../components/HowItWorks/HowItWorksFooter";

function HowItWorks() {
  return (
    <main className="w-full overflow-hidden bg-white">
      <HowItWorksHero />
      <ProcessSteps />
      <HowItWorksShowcase />
      <HowItWorksCTA />
      <HowItWorksFooter />
    </main>
  );
}

export default HowItWorks;