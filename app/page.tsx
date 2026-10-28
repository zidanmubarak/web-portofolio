import { AboutSection } from "@/components/sections/about-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { ContactSection } from "@/components/sections/contact-section";
import { EducationSection } from "@/components/sections/education-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { WorkSection } from "@/components/sections/work-section";
import { Footer } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteRail } from "@/components/layout/site-rail";
import { SettleController } from "@/components/settle-controller";
import { SkipLink } from "@/components/skip-link";

export default function Home() {
  return (
    <>
      <SkipLink />
      <SiteRail />
      <div className="page">
        <SiteHeader />
        <main id="main">
          <HeroSection />
          <AboutSection />
          <WorkSection />
          <ExperienceSection />
          <EducationSection />
          <CertificationsSection />
          <SkillsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <SettleController />
    </>
  );
}
