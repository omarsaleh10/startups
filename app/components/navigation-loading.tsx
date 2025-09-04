"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavigationLoading() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    // Hide loading after a short delay to show the animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Progress bar */}
      <div className="h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
        <div className="h-full bg-white/50 animate-ping"></div>
      </div>
      
      {/* Loading indicator */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-gray-600">Loading...</span>
        </div>
      </div>
    </div>
  );
}
