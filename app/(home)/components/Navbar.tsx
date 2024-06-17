import { link } from "fs";
import Link from "next/link";
import React from "react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

export default function Navbar() {
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
      link: "https://www.linkedin.com/in/ntwali-p/",
      label: "Twitter",
      Icon: SiX,
    },
  ];
  return (
    <div>
      <nav className="py-10 flex justify-between items-center">
        <h1 className="text-2xl font-bold underline underline-offset-8 decoration-green-500 -rotate-2 select-none">
          Iam Ntwali 👨🏾‍💻
        </h1>

        <div className="flex items-center gap-5">
          {socials.map((social, index) => {
            const Icon = social.Icon;
            return (
              <Link href={social.link} key={index} aria-label={social.label}>
                <Icon className="h-5 w-5 hover:scale-125 transition-all" />
              </Link>
            );
          })}
          {/* {socials.map(({ link, label, Icon }) => (
            <a href={link} key={label}>
              <Icon />
            </a>
          ))} */}
        </div>
      </nav>
    </div>
  );
}
