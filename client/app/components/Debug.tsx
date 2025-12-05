"use client";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function DebugTheme() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    console.log("theme:", theme);
    console.log("resolvedTheme:", resolvedTheme);
  }, [theme, resolvedTheme]);

  return null;
}
