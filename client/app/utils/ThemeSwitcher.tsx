"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

export const ThemeSwitcher = () => {
  const [mount, setMount] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => setMount(true), []);

  if (!mount) {
    return null;
  }

  return (
    <div className="flex items-center justify-center mx-4">
      {resolvedTheme === "light" ? (
        <BiMoon
          className="cursor-pointer text-black dark:text-white"
          size={25}
          onClick={() => setTheme("dark")}
        />
      ) : (
        <BiSun
          size={25}
          className="cursor-pointer text-black dark:text-white"
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
};
