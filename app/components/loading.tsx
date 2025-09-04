"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-50 via-white to-orange-50 z-50 flex items-center justify-center">
      <div className="relative">
        {/* Main loading circle */}
        <div className="w-16 h-16 border-4 border-pink-200 rounded-full animate-spin">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Pulsing dots */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-500 rounded-full animate-ping"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Loading text */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 font-semibold text-lg">Loading...</p>
          <div className="flex justify-center mt-2 space-x-1">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
