export const dynamic = "force-dynamic";
import Banner from "@/components/Banner";
import FeaturedResource from "@/components/FeaturedPrompt";
import FeatureSection from "@/components/FeatureSection";
import ReviewSection from "@/components/ReviewSection";
import TopPublishers from "@/components/TopCreators";
import WhyChooseUs from "@/components/WhyChooseUs";
import { getAllResources } from "@/lib/api/prompts";


const Home = async () => {
  const resources = await getAllResources();
  const firstResourceId = resources?.data?.[0]?._id || resources?.[0]?._id || null;
  
  return (
    <div>
      <Banner />
      <FeaturedResource />
      <WhyChooseUs />
      {firstResourceId && <ReviewSection />}
      <TopPublishers />
      <FeatureSection /> 
    </div>
  );
};

export default Home;