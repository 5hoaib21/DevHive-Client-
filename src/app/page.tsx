export const dynamic = "force-dynamic";
import Banner from "@/components/Banner";
import FeaturedResources from "@/components/FeaturedResources";
import BrowseByLanguage from "@/components/BrowseByLanguage";
import TopPicks from "@/components/TopPicks";
import WhyDevHive from "@/components/WhyDevHive";
import StatisticsSection from "@/components/StatisticsSection";
import TopPublishers from "@/components/TopPublishers";
import ReviewSection from "@/components/ReviewSection";
import { getAllResources } from "@/lib/api/prompts";

const Home = async () => {
  const resources = await getAllResources();
  const firstResourceId = resources?.data?.[0]?._id || resources?.[0]?._id || null;

  return (
    <div className="">
      {/* Section 1: Hero */}
      <Banner />

      {/* Section 2: Featured Resources */}
      <FeaturedResources />

      {/* Section 3: Browse by Language */}
      <BrowseByLanguage />

      {/* Section 4: Top Picks This Week */}
      <TopPicks />

      {/* Section 5: Why DevHive */}
      <WhyDevHive />

      {/* Section 6: Statistics */}
      <StatisticsSection />

      {/* Section 7: Publisher Leaderboard + Testimonials */}
      <TopPublishers />
      {firstResourceId && <ReviewSection />}
    </div>
  );
};

export default Home;
