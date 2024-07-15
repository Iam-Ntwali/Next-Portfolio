import React from "react";
import { SiNextdotjs, SiReactquery, SiTailwindcss } from "react-icons/si";
import Title from "./Title";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";

export default function Projects() {
  const projects = [
    {
      title: "Projects Coming Soon..",
      tech: [SiNextdotjs, SiTailwindcss, SiReactquery],
      cover: "/download.jpg",
      link: "https://github.com",
      github: "https://github.com",
      background: "bg-indigo-500",
    },
    {
      title: "Projects Coming Soon..",
      tech: [SiNextdotjs, SiTailwindcss, SiReactquery],
      cover: "/download.jpg",
      link: "https://github.com",
      github: "https://github.com",
      background: "bg-green-500",
    },
    {
      title: "Projects Coming Soon..",
      tech: [SiNextdotjs, SiTailwindcss, SiReactquery],
      cover: "/download.jpg",
      link: "https://github.com",
      github: "https://github.com",
      background: "bg-teal-500",
    },
    {
      title: "Projects Coming Soon..",
      tech: [SiNextdotjs, SiTailwindcss, SiReactquery],
      cover: "/download.jpg",
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
        className="flex flex-col items-center justify-center rotate-6"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 pt-20 gap-5">
        {projects.map((project, index) => {
          return (
            <div key={index}>
              <div className={cn("p-5 rounded-md", project.background)}>
                <DirectionAwareHover
                  imageUrl={project.cover}
                  className="w-full space-y-5 cursor-pointer"
                >
                  <div className="space-y-5">
                    <h1 className="text-xl font-bold">{project.title}</h1>
                    <div className="flex items-center gap-5 justify-center">
                      {project.tech.map((Icon, index) => {
                        return <Icon className="w-8 h-8" key={index} />;
                      })}
                    </div>
                    <div className="flex flex-row gap-2">
                      <Link
                        href={project.github}
                        className={cn(
                          "w-auto h-auto p-2 rounded-md hover:bg-red-500",
                          project.background
                        )}
                      >
                        Github
                      </Link>
                      <Link
                        href={project.link}
                        className={cn(
                          "w-auto h-auto p-2 rounded-md hover:bg-red-500",
                          project.background
                        )}
                      >
                        Live
                      </Link>
                    </div>
                  </div>
                </DirectionAwareHover>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
