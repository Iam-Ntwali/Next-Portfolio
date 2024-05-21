import React from "react";
import Link from "next/link";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];
type Props = {
  activeItem: number;
  isMobile: boolean;
};
const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className=" hidden 800px:">
        {navItemsData &&
          navItemsData.map((item, index) => {
            <Link href></Link>;
          })}
      </div>
    </>
  );
};

export default NavItems;
