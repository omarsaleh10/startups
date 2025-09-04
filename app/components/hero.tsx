"use client";

import SearchForm from "./searchform";
import { useSearchParams } from "next/navigation";

export default function Hero() {
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q");

  return (
    <>
    <section className="min-h-[10vh] bg-pink-500 relative overflow-hidden">
      {/* Orange vertical stripes pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 4.5%, #f97316 4.5%, #f97316 5.5%, transparent 5.5%)',
          backgroundSize: '10% 100%'
        }}></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[10vh] px-6 py-20">
        {/* Yellow banner with triangular notches */}
        <div className="relative mb-8">
          <div className="bg-yellow-400 px-8 py-3 relative">
            {/* Left triangular notch */}
            <div className="absolute left-0 top-0 w-0 h-0 border-l-[15px] border-l-transparent border-t-[30px] border-t-yellow-400"></div>
            {/* Right triangular notch */}
            <div className="absolute right-0 top-0 w-0 h-0 border-r-[15px] border-r-transparent border-t-[30px] border-t-yellow-400"></div>
            <span className="text-black font-bold text-lg uppercase tracking-wider">
              Pitch, Vote, and Grow
            </span>
          </div>
        </div>

        {/* Main heading block */}
        <div className="bg-black px-8 py-6 mb-8 max-w-4xl text-center">
          <h1 className="text-white font-bold text-4xl sm:text-5xl lg:text-6xl uppercase leading-tight">
            Pitch Your Startup,
            <br />
            Connect With Entrepreneurs
          </h1>
        </div>

        {/* Sub-heading */}
        <p className="text-white text-lg sm:text-xl text-center max-w-3xl mb-12 leading-relaxed">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        {/* Search form */}
        <SearchForm />

        {/* Search results indicator */}

      </div>
      
    </section>
    <section className="w-full max-w-3xl mt-6 text-center">
          <p className="text-black text-3xl font-bold dark:text-white">
            {currentQuery ? `Searching for: ${currentQuery}` : "All startups"}
          </p>
        </section>
    </>
  );
}