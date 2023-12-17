"use client";
import {
  AboutUsSection,
  BannerSection,
  BestSellerSection,
  SliderSection,
  SubscribeSection,
} from "@/components";
import { useState } from "react";

export default function Home() {
  const [dark, setdark] = useState(false);

  const handleChange = () => {
    setdark((p) => !p);

    const a = document.getElementById("h");
    if (a) {
      // If dark is true, add the 'dark' class; otherwise, remove it
      if (dark) {
        a.classList.add("dark");
      } else {
        a.classList.remove("dark");
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-between mt-[4rem]">
      <SliderSection />
      <AboutUsSection />
      <BestSellerSection />
      <BannerSection />
      <SubscribeSection />
      <div onClick={handleChange}></div>
      <div className="text-colorful h-screen">dsadasdasds</div>
      <div className="text-colorful">dsadasdasds</div>
      <div className="text-colorful">dsadasdasds</div>
      <div className="text-colorful">dsadasdasds</div>
      <div className="text-colorful">dsadasdasds</div>
      <div className="text-colorful">dsadasdasds</div>
    </main>
  );
}
