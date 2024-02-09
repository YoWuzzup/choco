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
    <main className="flex flex-col items-center justify-between mt-[4rem]">
      <SliderSection />
      <AboutUsSection />
      <BestSellerSection />
      <BannerSection />
      <SubscribeSection />
      <Footer />
    </main>
  );
}
