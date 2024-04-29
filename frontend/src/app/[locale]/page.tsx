"use client";
import {
  AboutUsSection,
  BannerSection,
  BestSellerSection,
  Footer,
  SliderSection,
  SubscribeSection,
} from "@/components";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <SliderSection />
      <AboutUsSection />
      <BestSellerSection />
      <BannerSection />
      <SubscribeSection />
      <Footer />
    </main>
  );
}
