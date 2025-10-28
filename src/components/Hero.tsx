"use client";

import { Play, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-purple-900/20 to-blue-900/20"></div>
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center space-y-8">
        <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/50 rounded-full px-4 py-2 mb-4">
          <TrendingUp className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-400 font-medium">Trending Now</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Watch <span className="text-gradient">Free Movies</span>
          <br />
          Online in HD
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Stream the latest Hollywood & Bollywood movies, TV shows, and web series 
          in stunning HD quality. No registration required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link href="/movies" className="btn-primary flex items-center gap-2 text-lg">
            <Play className="w-5 h-5" />
            Start Watching Now
          </Link>
          <Link href="/trending" className="btn-secondary flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5" />
            Browse Trending
          </Link>
        </div>

        <div className="pt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">10,000+</div>
            <div>Movies & Shows</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">HD Quality</div>
            <div>1080p Streaming</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">100% Free</div>
            <div>No Subscription</div>
          </div>
        </div>
      </div>
    </div>
  );
}
