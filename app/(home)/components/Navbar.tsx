import React from "react";
import Link from "next/link";
import { SiGithub, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import { cn } from "@/lib/utils";

export default function Navbar({ className }: { className?: string }) {
  const socials = [
    {
      link: "https://www.linkedin.com/in/ntwali-p/",
      label: "LinkedIn",
      Icon: SiLinkedin,
    },
    {
      link: "https://github.com/Iam-Ntwali",
      label: "Github",
      Icon: SiGithub,
    },
    {
      link: "https://www.instagram.com/iam_ntwali",
      label: "Instagram",
      Icon: SiInstagram,
    },
  ];
  return (
    <div>
      <nav className={cn("py-10 flex justify-between items-center", className)}>
        <h1 className="text-2xl font-bold underline underline-offset-8 decoration-green-500 -rotate-2 select-none">
          Iam Ntwali 👨🏾‍💻
        </h1>

        <div className="flex items-center gap-5">
          {socials.map((social, index) => {
            const Icon = social.Icon;
            return (
              <Link
                href={social.link}
                key={index}
                aria-label={social.label}
                target="_blank"
              >
                <Icon className="h-5 w-5 hover:scale-125 transition-all" />
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
