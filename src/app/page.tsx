"use client";

import { Preloader } from "@/components/Preloader";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhySection } from "@/components/WhySection";
import { NameSection } from "@/components/NameSection";
import { ChaosSection } from "@/components/ChaosSection";
import { OrganizeSection } from "@/components/OrganizeSection";
import { UniqueSection } from "@/components/UniqueSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { AudienceSection } from "@/components/AudienceSection";
import { NotIsSection } from "@/components/NotIsSection";
import { CollaborateSection } from "@/components/CollaborateSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { AboutSection } from "@/components/AboutSection";
import { FormSection } from "@/components/FormSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <WhySection />
        <NameSection />
        <ChaosSection />
        <OrganizeSection />
        <UniqueSection />
        <FeaturesSection />
        <AudienceSection />
        <NotIsSection />
        <CollaborateSection />
        <RoadmapSection />
        <AboutSection />
        <FormSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
