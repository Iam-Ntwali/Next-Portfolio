import Link from "next/link";
import React from "react";

export default function HeroSection() {
  return (
    <div className="min-h-[60vh] flex flex-col-reverse gap-14 lg:gap-0 lg:flex-row justify-between items-center py-10">
      <div className="space-y-10 text-center lg:text-left">
        <h1 className="text-4xl lg:text-7xl font-bold">
          Hello There! 👋,
          <br />{" "}
          <span className="underline underline-offset-8 decoration-green-500">
            {"I'm Ntwali"}
          </span>
          .
        </h1>
        <p className="md:w-96 text-lg text-gray-300">
          I am a Tech and Web Developer based in Rwanda 🇷🇼. I like building
          things that live on the Internet 🙂.
        </p>
        <Link
          href={"mailto:ntwalipit@gmail.com"}
          target="_blank"
          className="inline-block group"
        >
          <div>
            <h1 className="text-3xl font-bold group-hover:text-green-400 transition-all">
              {" "}
              Contact me 📬
            </h1>
            <div className="w-40 h-2 bg-green-500 rounded-full"></div>
            <div className="w-40 h-2 bg-indigo-500 rounded-full translate-x-2"></div>
          </div>
        </Link>
      </div>
      <div>
        <div className="w-72 h-72 space-y-3 -rotate-[30deg] relative">
          <div className="flex gap-3 translate-x-8">
            <div className="w-24 h-24  rounded-2xl bg-green-500 lg:w-32 lg:h-32"></div>
            <div className="w-24 h-24  rounded-full bg-indigo-500 lg:w-32 lg:h-32"></div>
          </div>
          <div className="flex gap-3 -translate-x-8">
            <div className="w-24 h-24  rounded-2xl bg-indigo-500 lg:w-32 lg:h-32"></div>
            <div className="w-24 h-24  rounded-full bg-green-500 lg:w-32 lg:h-32"></div>
          </div>
          <div className="glow absolute top-[40%] right-1/2 -z-10"></div>
        </div>
      </div>
    </div>
  );
}
