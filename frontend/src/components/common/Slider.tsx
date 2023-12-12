"use client";
import React, { ReactNode } from "react";
import ReactSlider from "react-slick";

type SliderT = {
  children?: ReactNode;
  header?: ReactNode;
  propSettings?: {};
  containerStyles?: string;
};

export const Slider: React.FC<SliderT> = ({
  children,
  header,
  propSettings,
  containerStyles,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const mergedSettings = { ...settings, ...propSettings };

  return (
    <div className={containerStyles ? containerStyles : "w-full"}>
      {header}
      <ReactSlider {...mergedSettings}>{children}</ReactSlider>
    </div>
  );
};
