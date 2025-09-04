"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    
    // Show transition animation
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-pink-50 via-white to-orange-50 flex items-center justify-center dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center">
        {/* Animated logo or brand */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center animate-pulse">
            <span className="text-white font-bold text-2xl">YC</span>
          </div>
        </div>
        
        {/* Loading animation */}
        <div className="flex justify-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        {/* Loading text */}
        <p className="text-gray-600 font-medium dark:text-gray-300">Loading page...</p>
      </div>
    </div>
  );
}
