"use client";

import { Play, Star, Tv } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Movie, TVShow, MediaItem, getImageUrl } from "@/lib/tmdb";

interface MovieGridProps {
  movies: MediaItem[];
  type?: 'movie' | 'tv';
}

const isTVShow = (item: MediaItem): item is TVShow => {
  return 'name' in item && 'first_air_date' in item;
};

export default function MovieGrid({ movies, type }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {movies.map((item) => {
        const isTV = type === 'tv' || isTVShow(item);
        const title = isTV ? (item as TVShow).name : (item as Movie).title;
        const releaseDate = isTV ? (item as TVShow).first_air_date : (item as Movie).release_date;
        const linkHref = isTV ? `/tv/${item.id}` : `/movie/${item.id}`;
        
        return (
          <Link href={linkHref} key={item.id} className="group">
            <div className="card">
              <div className="relative aspect-[2/3] overflow-hidden bg-gray-800">
                <Image
                  src={getImageUrl(item.poster_path, 'w500')}
                  alt={title || 'Media poster'}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-center">
                    <div className="bg-[#2ea043] rounded-full p-3">
                      {isTV ? (
                        <Tv className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white fill-white" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-semibold text-white">{item.vote_average.toFixed(1)}</span>
                </div>
                <div className="absolute top-2 left-2 bg-[#2ea043] rounded px-2 py-1 flex items-center gap-1">
                  {isTV ? (
                    <span className="text-xs font-semibold text-white">TV</span>
                  ) : (
                    <span className="text-xs font-semibold text-white">HD</span>
                  )}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-white truncate group-hover:text-[#2ea043] transition-colors">
                  {title}
                </h3>
                <div className="flex items-center justify-between mt-1 text-sm text-gray-400">
                  <span>{releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'}</span>
                  <span className="truncate ml-2">{item.original_language.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
