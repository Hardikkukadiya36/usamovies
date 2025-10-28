"use client";

import Link from "next/link";
import { Film, Laugh, Ghost, Heart, Zap, Drama, Sparkles, Swords } from "lucide-react";

const GENRES = [
  { name: "Action", icon: Zap, color: "from-red-600 to-orange-600", count: "2,500+" },
  { name: "Comedy", icon: Laugh, color: "from-yellow-600 to-amber-600", count: "1,800+" },
  { name: "Horror", icon: Ghost, color: "from-purple-600 to-pink-600", count: "1,200+" },
  { name: "Romance", icon: Heart, color: "from-pink-600 to-rose-600", count: "1,500+" },
  { name: "Sci-Fi", icon: Sparkles, color: "from-blue-600 to-cyan-600", count: "1,000+" },
  { name: "Drama", icon: Drama, color: "from-green-600 to-emerald-600", count: "2,200+" },
  { name: "Thriller", icon: Film, color: "from-gray-600 to-slate-600", count: "1,600+" },
  { name: "Adventure", icon: Swords, color: "from-indigo-600 to-violet-600", count: "1,400+" },
];

export default function GenreSection() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gradient">Browse by Genre</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {GENRES.map((genre) => {
          const Icon = genre.icon;
          return (
            <Link
              href={`/genre/${genre.name.toLowerCase()}`}
              key={genre.name}
              className="group"
            >
              <div className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${genre.color} p-6 h-32 flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
                <div className="absolute top-0 right-0 opacity-10">
                  <Icon className="w-24 h-24 transform rotate-12" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-6 h-6 text-white" />
                    <h3 className="text-xl font-bold text-white">{genre.name}</h3>
                  </div>
                  <p className="text-sm text-white/80">{genre.count} movies</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
