"use client";

import { TrendingUp, Play, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Movie, getImageUrl } from "@/lib/tmdb";

interface TrendingSectionProps {
  movies: Movie[];
}

export default function TrendingSection({ movies }: TrendingSectionProps) {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-8 h-8 text-red-600" />
          <h1 className="text-3xl font-bold text-gradient">Trending Movies & Shows - Watch Free HD Streams</h1>
        </div>
        <p className="text-gray-300 text-sm md:text-base">
          Discover the most popular movies and TV shows trending this week on 123movies. Stream HD content for free, similar to Soap2Day, with no registration required. 
          Watch the latest blockbusters, TV series, and more in high quality.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <Link 
            href={`/movie/${movie.id}-${movie.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-').trim()}`} 
            key={movie.id} 
            className="group relative"
          >
            <div className="card">
              <div className="relative aspect-video overflow-hidden bg-gray-800">
                <Image
                  src={getImageUrl(movie.backdrop_path, 'w780')}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-red-600 rounded-full p-4">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-red-600 rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">#{index + 1}</span>
                </div>
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold text-white">{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <div className="p-4">
                <h2 className="font-bold text-lg text-white group-hover:text-red-500 transition-colors">
                  {movie.title} - Watch Online Free HD
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  <span className="text-yellow-500">★</span> {movie.vote_average.toFixed(1)}/10 • {movie.popularity.toFixed(0)}K views{movie.release_date && ` • ${new Date(movie.release_date).getFullYear()}`}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">HD</span>
                  <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">Free Stream</span>
                  <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">No Sign Up</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
