import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { IntroSection } from "@/components/intro-section";
import { StatsCounter } from "@/components/stats-counter";

import { ExpertiseGrid } from "@/components/expertise-grid";
import { TrustSection } from "@/components/trust-section";

import { IndustrySolutions } from "@/components/industry-solutions";
import { EngagementModels } from "@/components/engagement-models";
import { TrainingServices } from "@/components/training-services";
import { InternshipSection } from "@/components/internship-section";
import { TestimonialsSlider } from "@/components/testimonials-slider";
import { GlobalLocations } from "@/components/global-locations";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <IntroSection />
      <StatsCounter />
     
      <ExpertiseGrid />
      <TrustSection />
      
      <IndustrySolutions />
      <EngagementModels />
      <TrainingServices />
      <InternshipSection />
      <TestimonialsSlider />
      <GlobalLocations />
      <Footer />
    </main>
  );
}
