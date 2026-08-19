import AdhdFaq from "@/components/anxiety-lp/AdhdFaq";
import FinalCta from "@/components/anxiety-lp/FinalCta";
import HeroSection from "@/components/anxiety-lp/herosection";
import KiddzoFooter from "@/components/anxiety-lp/KiddzoFooter";
import LearningDiscovery from "@/components/anxiety-lp/LearningDiscovery";
import NewsArticles from "@/components/anxiety-lp/NewsArticles";
import PlantServices from "@/components/anxiety-lp/PlantServices";
import WhyChooseUs from "@/components/anxiety-lp/WhyChooseUs";

export default function AnxietyPage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <NewsArticles />
      <PlantServices />
      <LearningDiscovery />
      <AdhdFaq />
      <FinalCta />
      <KiddzoFooter />
    </>
  );
}
