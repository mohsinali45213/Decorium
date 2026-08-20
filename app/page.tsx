import { Hero, HeroSlide } from "@/components/Hero";
import { MinimalIntro } from "@/components/MinimalIntro";
import { CollectionsSlider } from "@/components/CollectionsSlider";
import { BrandsSection } from "@/components/BrandsSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SmoothScroll } from "@/components/SmoothScroll";

const homeSlides: HeroSlide[] = [
  {
    number: "01",
    title: "Timeless Elegance",
    description: "Curated spaces designed with precision. Embrace the luxury of intentional minimalism and architectural grace.",
    desktopImage: "/images/desktop/pexels-artbovich-7166636.jpg",
    mobileImage: "/images/mobile/pexels-ahmetcotur-29702287.jpg",
  },
  {
    number: "02",
    title: "Natural Marble Slabs",
    description: "Direct quarry-imported natural blocks and bookmatched slabs from Carrara and Tuscany, curated for seamless statements.",
    desktopImage: "/images/desktop/pexels-artbovich-7534232.jpg",
    mobileImage: "/images/mobile/pexels-artbovich-6920611.jpg",
  },
  {
    number: "03",
    title: "Monolithic Precision",
    description: "Ultra-large 3200×1600mm monolithic porcelain surfaces engineered with continuous veining and zero-joint precision.",
    desktopImage: "/images/desktop/pexels-artbovich-8082311.jpg",
    mobileImage: "/images/mobile/pexels-artdjartem-119108916-38800609.jpg",
  },
  {
    number: "04",
    title: "Sculpted Details",
    description: "Freestanding baths, sculpted stone basins, and tapware in brushed champagne, creating textured tactile warmth.",
    desktopImage: "/images/desktop/pexels-jack-davis-86003658-11408618.jpg",
    mobileImage: "/images/mobile/pexels-misbaa-eri-426041722-37252312.jpg",
  },
  {
    number: "05",
    title: "Artisan Sanctuary",
    description: "Handcrafted architectural hardware and monolithic stone fixtures curated for contemporary luxury residences.",
    desktopImage: "/images/desktop/pexels-yankrukov-5793642.jpg",
    mobileImage: "/images/mobile/pexels-olenkabohovyk-5686479.jpg",
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
