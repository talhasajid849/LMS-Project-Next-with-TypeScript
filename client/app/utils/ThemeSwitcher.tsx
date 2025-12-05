"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

export const ThemeSwitcher = () => {
  const [mount, setMount] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMount(true), []);

  if (!mount) {
    return null;
  }
  // console.log(theme)

  return (
    <div className="flex item-center justify-center mx-4">
      {theme === "light" ? (
        <BiMoon
         className="cursor-pointer text-black dark:text-white"
          fill="black"
          size={25}
          onClick={() => setTheme("dark")}
        />
      ) : (
        <BiSun
          size={25}
          className="cursor-pointer"
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
};
