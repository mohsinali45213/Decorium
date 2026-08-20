"use client";

import { use, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { notFound } from "next/navigation";
import { MessageCircle, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CATALOG_PRODUCTS } from "@/lib/catalogData";
import { SiteFooter } from "@/components/SiteFooter";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = use(params);
  
  // Strict product matching by slug
  const product = CATALOG_PRODUCTS.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Gallery image collection (Primary image + curated detail views)
  const galleryImages = [
    product.coverImage,
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85",
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const mainSliderRef = useRef<Slider>(null);

  // Automatic slideshow for main page slider (slides every 4 seconds unless paused)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (mainSliderRef.current) {
        mainSliderRef.current.slickNext();
      } else {
        setActiveIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, galleryImages.length]);

  // Sync main slider when active index changes
  const handleSelectImage = (index: number) => {
    setActiveIndex(index);
    if (mainSliderRef.current) {
      mainSliderRef.current.slickGoTo(index);
    }
  };

  // Format currency
  const formattedPrice =
    product.variants && product.variants[0]?.price
      ? `₹${product.variants[0].price.toLocaleString("en-IN")}`
      : "₹1,25,000";

  // Main Page React Slick settings
  const mainSliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: activeIndex,
    afterChange: (current: number) => setActiveIndex(current),
    arrows: false,
  };

  return (
    <main className="min-h-screen w-full bg-[#fdf8f8] dark:bg-[#121212] text-[#1c1b1b] dark:text-[#f4f0ef] antialiased transition-colors duration-300">
      
      {/* Container */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 pt-8 md:pt-12 pb-24">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 font-label-caps text-label-caps text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] transition-colors uppercase"
          >
            <ArrowLeft className="size-4" />
            Back to Catalog
          </Link>
        </div>

        {/* Product Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Image Gallery with React Slick Slider */}
          <div
            className="lg:col-span-5 flex flex-col gap-4 items-start w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* React Slick Main Image Slider Container */}
            <div className="aspect-square w-full bg-[#f7f3f2] dark:bg-[#181818] rounded-2xl overflow-hidden border border-[#c4c7c7]/30 dark:border-[#2e2e2e] relative group shadow-sm main-product-slick">
              <Slider ref={mainSliderRef} {...mainSliderSettings}>
                {galleryImages.map((imgUrl, idx) => (
                  <div key={idx} className="outline-none focus:outline-none aspect-square relative">
                    <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
                      <Image
                        alt={`${product.name} View ${idx + 1}`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 rounded-2xl"
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        src={imgUrl}
                        priority={idx === 0}
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            {/* Gallery Image Thumbnails (Active thumbnail has NO border) */}
            <div className="flex gap-2.5 pt-1">
              {galleryImages.map((imgUrl, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={index}
                    onClick={() => handleSelectImage(index)}
                    className={`relative size-10 sm:size-12 rounded-none overflow-hidden transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "border-none opacity-100 scale-105 shadow-sm"
                        : "border border-[#c4c7c7]/30 dark:border-[#2e2e2e] opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image
                      alt={`Thumbnail ${index + 1}`}
                      className="object-cover rounded-none"
                      fill
                      sizes="80px"
                      src={imgUrl}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="lg:col-span-7 flex flex-col pt-4 lg:pt-0 text-left">
            
            {/* Category & Title */}
            <div className="mb-8">
              <span className="font-label-caps text-label-caps uppercase text-[#5d5f5f] dark:text-[#8e8e8e] tracking-widest block mb-2">
                01 / {product.categoryName || "FURNITURE"}
              </span>
              <h1 className="font-raleway text-headline-lg text-[#1c1b1b] dark:text-[#f4f0ef] font-light uppercase tracking-wide leading-tight mb-2">
                {product.name}
              </h1>
              <p className="font-body-lg text-body-lg text-[#5d5f5f] dark:text-[#8e8e8e]">
                {product.brand || "Natural Stone Collection"}
              </p>
              <p className="font-body-lg text-body-lg text-[#1c1b1b] dark:text-[#f4f0ef] font-medium mt-4">
                {formattedPrice}
              </p>
            </div>

            {/* Specification Grid */}
            <div className="border-t border-[#c4c7c7]/40 dark:border-[#262626] py-6 space-y-4 font-body-md text-body-md">
              <div className="grid grid-cols-3 gap-4">
                <span className="font-label-caps text-label-caps uppercase text-[#5d5f5f] dark:text-[#8e8e8e]">
                  MATERIAL
                </span>
                <span className="col-span-2 text-[#1c1b1b] dark:text-[#f4f0ef]">
                  {product.spec || "Natural Travertine"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="font-label-caps text-label-caps uppercase text-[#5d5f5f] dark:text-[#8e8e8e]">
                  FINISH
                </span>
                <span className="col-span-2 text-[#1c1b1b] dark:text-[#f4f0ef]">
                  Honed Natural
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="font-label-caps text-label-caps uppercase text-[#5d5f5f] dark:text-[#8e8e8e]">
                  DIMENSIONS
                </span>
                <span className="col-span-2 text-[#1c1b1b] dark:text-[#f4f0ef]">
                  220 x 100 x 75 cm
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="font-label-caps text-label-caps uppercase text-[#5d5f5f] dark:text-[#8e8e8e]">
                  ORIGIN
                </span>
                <span className="col-span-2 text-[#1c1b1b] dark:text-[#f4f0ef]">
                  {product.origin || "Italy"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="md"
                icon={MessageCircle}
                iconPosition="left"
                className="flex-1 rounded-full py-4 tracking-widest"
              >
                WHATSAPP
              </Button>
              <Button
                href="tel:+919876543210"
                variant="outline"
                size="md"
                icon={Phone}
                iconPosition="left"
                className="flex-1 rounded-full py-4 tracking-widest"
              >
                CALL
              </Button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-24 border-t border-[#c4c7c7]/40 dark:border-[#262626] pt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-left">
          <div className="md:col-span-4">
            <h2 className="font-label-caps text-label-caps uppercase text-[#5d5f5f] dark:text-[#8e8e8e] tracking-widest">
              ABOUT THE PRODUCT
            </h2>
          </div>
          <div className="md:col-span-8">
            <h3 className="font-raleway text-headline-md text-[#1c1b1b] dark:text-[#f4f0ef] uppercase font-light tracking-wide mb-6">
              {product.name}
            </h3>
            <p className="font-body-lg text-body-lg text-[#5d5f5f] dark:text-[#a0a0a0] leading-relaxed max-w-3xl">
              {product.description ||
                "A sculptural dining table crafted from solid natural travertine. Its design combines the organic, porous character of the stone with a refined, modern silhouette. The monolithic pedestal base provides substantial visual weight, while the honed top offers a smooth, tactile surface for dining and gathering. Each piece is unique, exhibiting variations in veining and texture inherent to the natural material."}
            </p>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
