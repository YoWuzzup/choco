"use client";

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div onClick={handleChange}>asdsa</div>
      <div className="text-colorful">dsadasdasds</div>
    </main>
  );
}
