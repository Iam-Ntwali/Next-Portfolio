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
      <nav className="py-10">
        <h1>Iam Ntwali 👨🏾‍💻</h1>

        <div>
          {socials.map((social, index) => {
            const Icon = social.Icon;
            return (
              <Link href={social.link} key={index} aria-label={social.label}>
                <Icon />
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
