import { Hero } from "@/components/Hero";
import { MinimalIntro } from "@/components/MinimalIntro";
import { CollectionsSlider } from "@/components/CollectionsSlider";
import { SiteFooter } from "@/components/SiteFooter";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function HomePage() {
  return (
    <SmoothScroll>
      <main>
        <Hero />
        <MinimalIntro />
        <CollectionsSlider />
        <SiteFooter />
      </main>
    </SmoothScroll>
  );
}
