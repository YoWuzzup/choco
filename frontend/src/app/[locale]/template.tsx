"use client";
import { useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [dark, setdark] = useState(false);

  // TODO: change theme button
  const handleChange = () => {
    setdark((p) => !p);

    const a = document.getElementsByTagName("html")[0];
    if (a) {
      // If dark is true, add the 'dark' class; otherwise, remove it
      if (dark) {
        a.classList.add("dark");
      } else {
        a.classList.remove("dark");
      }
    }
  };

  return <>{children}</>;
}
