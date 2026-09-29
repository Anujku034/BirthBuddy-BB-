import React from "react";

import AboutHero from "../components/About/AboutHero";
import AboutMission from "../components/About/AboutMission";
import AboutStory from "../components/About/AboutStory";
import AboutValues from "../components/About/AboutValues";
import AboutImpact from "../components/About/AboutImpact";
import AboutCTA from "../components/About/AboutCTA";
import AboutFooter from "../components/About/AboutFooter";

function About() {
  return (
    <main className="overflow-hidden bg-white">
      <AboutHero />
      <AboutMission />
      <AboutStory />
      <AboutValues />
      <AboutImpact />
      <AboutCTA />
      <AboutFooter />
    </main>
  );
}

export default About;