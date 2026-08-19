import { Hero, HeroSlide } from "@/components/Hero";
import { MinimalIntro } from "@/components/MinimalIntro";
import { CollectionsSlider } from "@/components/CollectionsSlider";
import { BrandsSection } from "@/components/BrandsSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SmoothScroll } from "@/components/SmoothScroll";
import customBg from "@/stitch_decorium_editorial_navbar/decorium_floating_hero_variant_b/hero-bg-custom.jpg";

const homeSlides: HeroSlide[] = [
  {
    number: "01",
    title: "Timeless Elegance",
    description: "Curated spaces designed with precision. Embrace the luxury of intentional minimalism and architectural grace.",
    image: customBg,
  },
  {
    number: "02",
    title: "Natural Marble Slabs",
    description: "Direct quarry-imported natural blocks and bookmatched slabs from Carrara and Tuscany, curated for seamless statements.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85",
  },
  {
    number: "03",
    title: "Monolithic Precision",
    description: "Ultra-large 3200×1600mm monolithic porcelain surfaces engineered with continuous veining and zero-joint precision.",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1920&q=85",
  },
  {
    number: "04",
    title: "Sculpted Details",
    description: "Freestanding baths, sculpted stone basins, and tapware in brushed champagne, creating textured tactile warmth.",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1920&q=85",
  },
];

export default function HomePage() {
  return (
    <SmoothScroll>
      <main>
        <Hero slides={homeSlides} />
        <MinimalIntro />
        <CollectionsSlider />
        <BrandsSection />
        <SiteFooter />
      </main>
    </SmoothScroll>
  );
}
