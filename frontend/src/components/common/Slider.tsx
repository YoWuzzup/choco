"use client";
import React, { ReactNode, useState } from "react";
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // custom dots
    appendDots: (dots: any) => (
      <ul className="">
        {dots.map((d: any, index: number) => {
          return (
            <li
              key={index}
              className={`${
                d.props.className
              } relative w-3 h-3 rounded-full outline-none focus:outline-none focus-visible:outline-none
              ${index === currentSlide ? "bg-colorful" : "bg-secondary"}`}
            >
              {d.props.children}
            </li>
          );
        })}
      </ul>
    ),
    // the buttons inside dots that change slides
    customPaging: (index: any) => {
      return (
        <button
          className={`w-full h-full absolute top-0 left-0 outline-none focus:outline-none focus-visible:outline-none
          ${index === currentSlide ? "slick-active" : ""}`}
        ></button>
      );
    },
    beforeChange: (prev: number, next: number) => {
      setCurrentSlide(next);
    },
  };

  const mergedSettings = { ...settings, ...propSettings };

  return (
    <div className={containerStyles ? containerStyles : "w-full"}>
      {header}
      <ReactSlider {...mergedSettings}>{children}</ReactSlider>
    </div>
  );
};
