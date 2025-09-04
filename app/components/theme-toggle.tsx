"use client";

import { useTheme } from "@/app/contexts/theme-context";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-20 items-center rounded-full bg-gradient-to-r from-pink-500 to-orange-500 p-1 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:from-purple-500 dark:to-blue-500"
      aria-label="Toggle theme"
    >
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ${
          theme === "dark" ? "translate-x-10" : "translate-x-0"
        }`}
      >
        {theme === "light" ? (
          <Sun className="h-5 w-5 text-orange-500" />
        ) : (
          <Moon className="h-5 w-5 text-blue-500" />
        )}
      </div>
    </button>
  );
}
