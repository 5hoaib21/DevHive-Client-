export const dynamic = "force-dynamic";
import Banner from "@/components/Banner";
import FeaturedResources from "@/components/FeaturedResources";
import BrowseByLanguage from "@/components/BrowseByLanguage";
import TopPicks from "@/components/TopPicks";
import WhyDevHive from "@/components/WhyDevHive";
import StatisticsSection from "@/components/StatisticsSection";
import TopPublishers from "@/components/TopPublishers";
import ReviewSection from "@/components/ReviewSection";
import SectionReveal from "@/components/motion/SectionReveal";
import { getAllResources } from "@/lib/api/prompts";

const Home = async () => {
  const resources = await getAllResources();
  const firstResourceId = resources?.data?.[0]?._id || resources?.[0]?._id || null;

  return (
    <div className="">
      {/* Section 1: Hero */}
      <Banner />

      {/* Section 2: Featured Resources */}
      <SectionReveal><FeaturedResources /></SectionReveal>

      {/* Section 3: Browse by Language */}
      <SectionReveal delay={0.05}><BrowseByLanguage /></SectionReveal>

      {/* Section 4: Top Picks This Week */}
      <SectionReveal delay={0.1}><TopPicks /></SectionReveal>

      {/* Section 5: Why DevHive */}
      <SectionReveal delay={0.15}><WhyDevHive /></SectionReveal>

      {/* Section 6: Statistics */}
      <SectionReveal delay={0.2}><StatisticsSection /></SectionReveal>

      {/* Section 7: Publisher Leaderboard + Testimonials */}
      <SectionReveal delay={0.25}><TopPublishers /></SectionReveal>
      {firstResourceId && <SectionReveal delay={0.3}><ReviewSection /></SectionReveal>}
    </div>
  );
};

export default Home;
