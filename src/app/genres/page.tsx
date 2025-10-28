import { Metadata } from "next";
import { getGenres } from "@/lib/tmdb";
import Link from "next/link";
import { Film, Laugh, Ghost, Heart, Zap, Drama, Sparkles, Swords, Skull, Rocket, Mountain, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Browse Movies by Genre - All Movie Categories | 123Movies",
  description: "Browse movies by genre. Find action, comedy, horror, romance, sci-fi, thriller, and more. Watch movies online free in HD.",
  keywords: "movie genres, action movies, comedy movies, horror movies, romance movies, thriller movies, browse by genre",
};

const genreIcons: Record<string, any> = {
  'Action': Zap,
  'Adventure': Mountain,
  'Animation': Sparkles,
  'Comedy': Laugh,
  'Crime': Skull,
  'Documentary': Film,
  'Drama': Drama,
  'Family': Users,
  'Fantasy': Swords,
  'History': Film,
  'Horror': Ghost,
  'Music': Film,
  'Mystery': Film,
  'Romance': Heart,
  'Science Fiction': Rocket,
  'TV Movie': Film,
  'Thriller': Film,
  'War': Swords,
  'Western': Swords,
};

const genreColors: Record<string, string> = {
  'Action': 'from-red-600 to-orange-600',
  'Adventure': 'from-indigo-600 to-violet-600',
  'Animation': 'from-pink-600 to-purple-600',
  'Comedy': 'from-yellow-600 to-amber-600',
  'Crime': 'from-gray-700 to-gray-900',
  'Documentary': 'from-blue-600 to-cyan-600',
  'Drama': 'from-green-600 to-emerald-600',
  'Family': 'from-teal-600 to-cyan-600',
  'Fantasy': 'from-purple-600 to-pink-600',
  'History': 'from-amber-700 to-orange-700',
  'Horror': 'from-purple-600 to-pink-600',
  'Music': 'from-pink-500 to-rose-500',
  'Mystery': 'from-indigo-700 to-purple-700',
  'Romance': 'from-pink-600 to-rose-600',
  'Science Fiction': 'from-blue-600 to-cyan-600',
  'TV Movie': 'from-slate-600 to-gray-600',
  'Thriller': 'from-gray-600 to-slate-600',
  'War': 'from-red-700 to-orange-700',
  'Western': 'from-amber-600 to-orange-600',
};

export default async function GenresPage() {
  const data = await getGenres();

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Browse by Genre
          </h1>
          <p className="text-gray-400 text-lg">
            Explore movies by your favorite genres. From action-packed thrillers to heartwarming romances.
          </p>
        </div>

        {/* Genres Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {data.genres.map((genre) => {
            const Icon = genreIcons[genre.name] || Film;
            const colorClass = genreColors[genre.name] || 'from-gray-600 to-slate-600';

            return (
              <Link
                key={genre.id}
                href={`/genre/${genre.id}`}
                className="group"
              >
                <div className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${colorClass} p-6 h-40 flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
                  <div className="absolute top-0 right-0 opacity-10">
                    <Icon className="w-32 h-32 transform rotate-12" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-6 h-6 text-white" />
                      <h2 className="text-xl font-bold text-white">{genre.name}</h2>
                    </div>
                    <p className="text-sm text-white/80">Explore {genre.name.toLowerCase()} movies</p>
                  </div>
                  <div className="relative z-10 flex items-center text-white/80 text-sm group-hover:text-white transition-colors">
                    <span>View all</span>
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* SEO Content */}
        <div className="mt-16 bg-gray-900 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Discover Movies by Genre
          </h2>
          <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
            <p>
              Browse our extensive collection of movies organized by genre. Whether you're in the mood 
              for heart-pounding action, laugh-out-loud comedy, spine-chilling horror, or touching romance, 
              we have something for everyone.
            </p>
            <p>
              Each genre page features carefully curated selections of the best movies in that category. 
              Stream all movies in HD quality without any registration or subscription fees.
            </p>
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Popular Genres</h3>
            <ul className="grid md:grid-cols-2 gap-2">
              <li><strong>Action Movies:</strong> Explosive stunts and thrilling sequences</li>
              <li><strong>Comedy Movies:</strong> Laugh-out-loud entertainment</li>
              <li><strong>Horror Movies:</strong> Scary films and psychological thrillers</li>
              <li><strong>Romance Movies:</strong> Love stories and romantic comedies</li>
              <li><strong>Sci-Fi Movies:</strong> Futuristic and space adventures</li>
              <li><strong>Drama Movies:</strong> Compelling stories and performances</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
