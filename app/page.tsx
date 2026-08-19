import { Hero } from "@/components/Hero";
import { MinimalIntro } from "@/components/MinimalIntro";
import { CollectionsSlider } from "@/components/CollectionsSlider";
import { BrandsSection } from "@/components/BrandsSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function HomePage() {
  return (
    <SmoothScroll>
      <main>
        <Hero />
        <MinimalIntro />
        <CollectionsSlider />
        <BrandsSection />
        <SiteFooter />
      </main>
    </SmoothScroll>
  );
}
