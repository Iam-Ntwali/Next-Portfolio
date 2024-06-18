"use client";
import React from "react";
import Title from "./Title";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
  SiExpress,
  SiGit,
  SiJavascript,
  SiMongoose,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiSupabase,
  SiTailwindcss,
} from "react-icons/si";
import { text } from "stream/consumers";

export default function Skills() {
  // Skills Variable
  const skills = [
    { text: "Javascript", Icon: SiJavascript },
    { text: "Tailwind", Icon: SiTailwindcss },
    { text: "Node.js", Icon: SiNodedotjs },
    { text: "Express", Icon: SiExpress },
    { text: "React", Icon: SiReact },
    { text: "Next.js", Icon: SiNextdotjs },
    { text: "Git", Icon: SiGit },
    { text: "Supabase", Icon: SiSupabase },
    { text: "Mongo DB", Icon: SiMongoose },
  ];
  return (
    <div className="max-w-5xl mx-auto px-8">
      {/* Section title */}
      <Title
        text="Skills 🔪"
        className="flex flex-col items-center justify-center -rotate-6"
      />

      {/* Content cards */}
      <HoverEffect items={skills} />
    </div>
  );
}
