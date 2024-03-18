"use client";
import { useEffect, useState } from "react";

import { Button, Tooltip } from "..";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";

const isBrowser = () => typeof window !== "undefined";

export const ScrollToTop: React.FC = () => {
  if (!isBrowser()) return null;

  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible ? (
        <Button
          type={"button"}
          buttonClasses={`w-16 h-16 fixed bottom-[4rem] right-[4rem] p-4 border border-colorful bg-primary text-colorful hover:text-secondary font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-colorful hover:shadow-lg focus:bg-colorful focus:shadow-lg focus:outline-none focus:text-secondary focus:ring-0 active:bg-colorful active:shadow-lg active:text-secondary transition duration-150 ease-in-out`}
          handleClick={handleBackToTop}
        >
          <Tooltip message={"Back to top"}>
            <span className="sr-only">scroll to top</span>
            <ArrowCircleUpOutlinedIcon className="w-full h-full" />
          </Tooltip>
        </Button>
      ) : null}
    </>
  );
};
