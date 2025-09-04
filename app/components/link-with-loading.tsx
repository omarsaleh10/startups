"use client";

import Link from "next/link";
import { useState } from "react";

interface LinkWithLoadingProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function LinkWithLoading({ href, children, className, onClick }: LinkWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    if (onClick) onClick();
    
    // Reset loading state after navigation
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </Link>
  );
}
