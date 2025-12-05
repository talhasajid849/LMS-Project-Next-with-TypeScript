"use client";

import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import DebugTheme from "./Debug";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
};

const Header: FC<Props> = ({ activeItem, setOpen }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 85);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = (e: any) => {
    if (e.target.id == "screen") {
      {
        setOpenSidebar(false);
      }
    }
  };

  // console.log(openSidebar)
  return (
    <div className="w-full relative ">
      <div
        className={`${
          active
            ? "fixed top-0 left-0 w-full h-20 z-[80] bg-white/80 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-[#ffffff1c] shadow-xl transition-all duration-500"
            : "w-full h-20 z-[80] border-b dark:border-[#ffffff1c] dark:shadow"
        }`}
      >
        <div className="w-[95%] sm:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-20 flex items-center justify-between p-3">
            {/* Logo */}
            <div>
              <Link
                href="/"
                className="text-[25px] font-Poppins font-medium text-black dark:text-white"
              >
                ELearning
              </Link>
            </div>

            {/* Nav items + Theme Switcher */}
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />

              {/* only for the mobile */}
              <div className="block sm:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              <HiOutlineUserCircle
                size={25}
                className="hidden sm:block cursor-pointer dark:text-white text-black"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* mobile Sidebar */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024] "
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 ">
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2  dark:text-white text-black"
                onClick={() => setOpen(openSidebar)}
              />
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white ">
                Copyright &copy 2023 Elearning
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
