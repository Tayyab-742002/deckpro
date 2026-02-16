import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import MobileServiceBanner from "@/components/MobileServiceBanner";
import HowItWorks from "@/components/HowItWorks";
import ServicesOverview from "@/components/ServicesOverview";
import GallerySection from "@/components/GallerySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <WhyChooseUs />
      <MobileServiceBanner />
      <HowItWorks />
      <ServicesOverview />
      <GallerySection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
