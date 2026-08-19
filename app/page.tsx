import AutismiaHero from "@/components/AutismiaHero";
import PlantServices from "@/components/PlantServices";
import RoadmapInfographic from "@/components/RoadmapInfographic";
import WhyChooseUs from "@/components/WhyChooseUs";
import KiddzoFooter from "@/components/KiddzoFooter";
import LearningDiscovery from "@/components/LearningDiscovery";
import AdhdFaq from "@/components/AdhdFaq";
import FinalCta from "@/components/FinalCta";
import NewsArticles from "@/components/NewsArticles";

export default function Home() {
  return (
    <>
      <AutismiaHero />
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
