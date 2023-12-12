"use client";
import { SliderSection } from "@/components";
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
      <>
        <SliderSection />
      </>
      <div onClick={handleChange}></div>
      <div className="text-colorful">dsadasdasds</div>
      <div className="text-colorful">dsadasdasds</div>
      <div className="text-colorful">dsadasdasds</div>
      <div className="text-colorful">dsadasdasds</div>
      <div className="text-colorful">dsadasdasds</div>
      <div className="text-colorful">dsadasdasds</div>
    </main>
  );
}
