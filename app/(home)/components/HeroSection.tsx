import { MovingBorderBtn } from "@/components/ui/moving-border";
import Link from "next/link";
import React from "react";
import Title from "./Title";

export default function HeroSection() {
  return (
    // Hero section container
    <div className="min-h-[60vh] flex flex-col-reverse gap-14 lg:gap-0 lg:flex-row justify-between items-center py-10">
      {/* hero section text content/ Right side*/}
      <div className="space-y-10 text-center lg:text-left">
        {/* Hero title */}
        <h1 className="text-3xl lg:text-5xl   text-white">
          Hello There!👋🏾,
          <br /> {"I'm "}
          <span className="text-4xl lg:text-7xl font-bold text-gray-400 underline underline-offset-8 decoration-green-500">
            Pacifique Ntwali
          </span>
          .
        </h1>
        {/* Hero description*/}
        <p className="md:w-96 text-lg text-gray-300">
          I am a Web Developer and Tech enthusiast based in Rwanda 🇷🇼, dedicated
          to crafting digital experiences that thrive on the internet. 🙂
        </p>
        {/* Hero btn link */}
        <Link
          href={"mailto:ntwalipit@gmail.com"}
          target="_blank"
          className="inline-block group"
        >
          <Title text="Contact me 📬" />
        </Link>
      </div>
      {/* Hero section left side design */}
      <div className="relative">
        {/* Circle elements containers */}
        <div className="w-72 h-72 space-y-3 -rotate-[30deg] relative">
          <div className="flex gap-3 translate-x-8">
            <div className="w-24 h-24  rounded-2xl bg-green-500 lg:w-32 lg:h-32"></div>
            <div className="w-24 h-24  rounded-full bg-indigo-500 lg:w-32 lg:h-32"></div>
          </div>
          <div className="flex gap-3 -translate-x-8">
            <div className="w-24 h-24  rounded-2xl bg-indigo-500 lg:w-32 lg:h-32"></div>
            <div className="w-24 h-24  rounded-full bg-green-500 lg:w-32 lg:h-32"></div>
          </div>
          {/* Glowing effect bg */}
          <div className="glow absolute top-[40%] right-1/2 -z-10"></div>
        </div>
        {/* Moving border button  */}
        <div className="absolute bottom-5 sm:bottom-14 left-0 sm:-left-10 ">
          <MovingBorderBtn borderRadius="0.5rem" className="p-3 font-semibold">
            <Link
              href={"mailto:ntwalipit@gmail.com"}
              target="_blank"
              className="inline-block group"
            >
              <p>📢 Available for work</p>
            </Link>
          </MovingBorderBtn>
        </div>
      </div>
    </div>
  );
}
