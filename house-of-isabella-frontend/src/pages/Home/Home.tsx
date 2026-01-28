import HeroSlider from "./HeroSlider/HeroSlider";
import LuxurySection from "../../components/LuxurySection/LuxurySection";
import GiftGuideSection from "../../components/GiftGuideSection/GiftGuideSection";
import ShopByStyleSection from "../../components/ShopByStyleSection/ShopByStyleSection";
import ShopByCategorySection from "../../components/ShopByCategorySection/ShopByCategorySection";
import AsSeenInSection from "../../components/AsSeenInSection/AsSeenInSection";
import NewArrivalsOutletSection from "../../components/NewArrivalsOutletSection/NewArrivalsOutletSection";
import FeaturedCollectionSection from "../../components/FeaturedCollectionSection/FeaturedCollectionSection";
import AboutVideoSection from "../../components/AboutVideoSection/AboutVideoSection";
import AboutStorySection from "../../components/AboutStorySection/AboutStorySection";
import CustomerReviewsSection from "../../components/CustomerReviewsSection/CustomerReviewsSection";
import FeaturedBrandsSection from "../../components/FeaturedBrandsSection/FeaturedBrandsSection";
import InstagramFeedSection from "../../components/InstagramFeedSection/InstagramFeedSection";

function home() {
  return (
    <>
     
      <main>
        <HeroSlider />
        <LuxurySection />
        <GiftGuideSection />
        <ShopByStyleSection />
        <ShopByCategorySection />
        <AsSeenInSection />
        <NewArrivalsOutletSection />
        <FeaturedCollectionSection />
        <AboutVideoSection />
        <AboutStorySection />
        <CustomerReviewsSection />
        <FeaturedBrandsSection />
        <InstagramFeedSection />
      </main>
    </>
  );
}
export default home;
