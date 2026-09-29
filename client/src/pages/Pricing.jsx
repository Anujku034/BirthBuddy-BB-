import React from "react";

import PricingHero from "../components/Pricing/PricingHero";
import PricingPlans from "../components/Pricing/PricingPlans";
import ComparePlans from "../components/Pricing/ComparePlans";
import PricingFAQ from "../components/Pricing/PricingFAQ";
import PricingCTA from "../components/Pricing/PricingCTA";
import PricingFooter from "../components/Pricing/PricingFooter";

function Pricing() {
  return (
    <main className="w-full overflow-hidden bg-[#FCFBFF] text-[#10194A]">
      <PricingHero />
      <PricingPlans />
      <ComparePlans />
      <PricingFAQ />
      <PricingCTA />
      <PricingFooter />
    </main>
  );
}

export default Pricing;