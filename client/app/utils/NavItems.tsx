"use client";

import Link from "next/link";
import React from "react";

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
    name: "Plicy",
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
// console.log(navItemsData)
const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  // console.log(isMobile)
  return (
    <>
      <div className="hidden sm:flex">
        {navItemsData.map((i, index) => (
          <Link href={i.url} key={i.url}>
            <span
              className={`${
                activeItem === index
                  ? "dark:text-[#37a39a] text-[crimson] "
                  : "dark:text-white text-black"
              } text-[18px] px-6 font-Poppins font-normal`}
            >
              {i.name}
            </span>
          </Link>
        ))}
      </div>
      {/* For isMobile */}
      {isMobile && (
        <div className="sm:hidden mt-5">
           {/* Logo */}
            <div className="text-center">
              <Link
                href="/"
                className="text-[25px] text-center font-Poppins font-medium text-black dark:text-white"
              >
                ELearning
              </Link>
            </div>
            {navItemsData &&
              navItemsData.map((i, index) => (
                <Link href={i.url} key={index}>
                  <span
                    className={`${
                      activeItem === index
                        ? "dark:text-[#37a39a] text-[crimson] "
                        : "dark:text-white text-black"
                    } block py-5 text-[18px] px-6 font-Poppins font-normal`}
                  >
                    {i.name}
                  </span>
                </Link>
              ))}
          </div>
      )}
    </>
  );
};

export default NavItems;
