import React from "react";
import { SiNextdotjs, SiReactquery, SiTailwindcss } from "react-icons/si";
import Title from "./Title";

export default function Projects() {
  const projects = [
    {
      title: "Portfolio Website",
      tech: [SiNextdotjs, SiTailwindcss, SiReactquery],
      cover: "/public/Project-Img1.png",
      link: "https://github.com",
      github: "https://github.com",
      background: "bg-indigo-500",
    },
    {
      title: "Portfolio Website",
      tech: [SiNextdotjs, SiTailwindcss, SiReactquery],
      cover: "/public/Project-Img1.png",
      link: "https://github.com",
      github: "https://github.com",
      background: "bg-green-500",
    },
    {
      title: "Portfolio Website",
      tech: [SiNextdotjs, SiTailwindcss, SiReactquery],
      cover: "/public/Project-Img1.png",
      link: "https://github.com",
      github: "https://github.com",
      background: "bg-crimson-500",
    },
    {
      title: "Portfolio Website",
      tech: [SiNextdotjs, SiTailwindcss, SiReactquery],
      cover: "/public/Project-Img1.png",
      link: "https://github.com",
      github: "https://github.com",
      background: "bg-blue-500",
    },
  ];
  return (
    <div className="py-10 p-5 sm:p-0">
      {/* Section title */}
      <Title
        text="Projects 🎨"
        className="flex flex-col items-center justify-center -rotate-6"
      />
    </div>
  );
}