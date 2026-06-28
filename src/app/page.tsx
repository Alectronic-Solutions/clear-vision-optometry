import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import FrameCatalog from "@/components/FrameCatalog";
import InsuranceChecker from "@/components/InsuranceChecker";
import AppointmentFlow from "@/components/AppointmentFlow";
import DoctorsSection from "@/components/DoctorsSection";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import MapContactSection from "@/components/MapContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <ServicesSection />
        <FrameCatalog />
        <InsuranceChecker />
        <AppointmentFlow />
        <DoctorsSection />
        <ReviewsSection />
        <FAQSection />
        <MapContactSection />
      </main>
      <Footer />
    </>
  );
}
