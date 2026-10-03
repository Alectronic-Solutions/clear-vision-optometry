import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PracticeIntro from "@/components/PracticeIntro";
import FrameCatalog from "@/components/FrameCatalog";
import InsuranceChecker from "@/components/InsuranceChecker";
import AppointmentFlow from "@/components/AppointmentFlow";
import DoctorsSection from "@/components/DoctorsSection";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import MapContactSection from "@/components/MapContactSection";

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <ServicesSection />
      <PracticeIntro />
      <FrameCatalog />
      <InsuranceChecker />
      <AppointmentFlow />
      <DoctorsSection />
      <ReviewsSection />
      <FAQSection />
      <MapContactSection />
    </main>
  );
}
