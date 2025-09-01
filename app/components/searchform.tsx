"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize query from URL search params
  useEffect(() => {
    const urlQuery = searchParams.get("q");
    if (urlQuery) {
      setQuery(urlQuery);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Create new URLSearchParams object
      const params = new URLSearchParams(searchParams.toString());
      params.set("q", query.trim());
      
      // Navigate to search results page with updated params
    //   router.push(`/search?${params.toString()}`);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    
    // Update URL params in real-time (optional - removes this if you prefer form submission only)
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value.trim()) {
      params.set("q", e.target.value.trim());
    } else {
      params.delete("q");
    }
    
    // Update URL without navigation
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="bg-white border-4 border-black rounded-full px-6 py-4 flex items-center gap-4 shadow-lg">
        <span className="text-black font-bold text-lg uppercase flex-shrink-0">
          Search Startup
        </span>
        
        <input 
          type="text" 
          value={query}
          onChange={handleInputChange}
          placeholder="Enter startup name or category..."
          className="flex-1 text-black placeholder-gray-500 outline-none text-lg font-medium"
          disabled={isLoading}
        />
        
        <button 
          type="submit"
          disabled={isLoading || !query.trim()}
          className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
