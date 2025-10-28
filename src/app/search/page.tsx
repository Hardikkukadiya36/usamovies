import { Metadata } from "next";
import { searchMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import AdBanner from "@/components/AdBanner";
import Pagination from "@/components/Pagination";
import { Search, TrendingUp, Film, Tv, Star, Clock, Calendar, Heart } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Search Movies - 123Movies",
  description: "Search and find your favorite movies to watch online free in HD quality.",
};

interface SearchPageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const page = parseInt(searchParams.page || '1');
  
  const data = query ? await searchMovies(query, page) : { results: [], total_pages: 0 };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Search className="w-10 h-10 text-red-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Search Results
            </h1>
          </div>
          {query && (
            <p className="text-gray-400 text-lg">
              Showing results for: <span className="text-white font-semibold">"{query}"</span>
            </p>
          )}
        </div>

        {/* Ad Banner */}
        <AdBanner slot="search-top-banner" />

        {/* Results */}
        <div className="my-12">
          {!query ? (
            <div className="py-12">
              <div className="text-center mb-12">
                <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">What are you looking for?</h2>
                <p className="text-gray-400 mb-8">Search for movies, TV shows, and more</p>
              </div>
              
              {/* Trending Searches */}
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-semibold text-white">Trending Searches</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {/* Popular Categories */}
                  <Link href="/search?q=123movies" className="group bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors">
                    <div className="flex items-center gap-3">
                      <Film className="w-5 h-5 text-red-500 group-hover:text-red-400 transition-colors" />
                      <span className="text-white font-medium">123movies</span>
                    </div>
                  </Link>
                  
                  <Link href="/search?q=123movies+free+movies" className="group bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors">
                    <div className="flex items-center gap-3">
                      <Film className="w-5 h-5 text-blue-500 group-hover:text-blue-400 transition-colors" />
                      <span className="text-white font-medium">123movies Free Movies</span>
                    </div>
                  </Link>
                  
                  <Link href="/search?q=123movies+tv+shows" className="group bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors">
                    <div className="flex items-center gap-3">
                      <Tv className="w-5 h-5 text-green-500 group-hover:text-green-400 transition-colors" />
                      <span className="text-white font-medium">123movies TV Shows</span>
                    </div>
                  </Link>
                  
                  <Link href="/search?q=123movies+alternative" className="group bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors">
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                      <span className="text-white font-medium">123movies Alternatives</span>
                    </div>
                  </Link>
                  
                  {/* Popular Genres */}
                  <Link href="/search?q=action+movies" className="group bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors">
                    <div className="flex items-center gap-3">
                      <Film className="w-5 h-5 text-red-500 group-hover:text-red-400 transition-colors" />
                      <span className="text-white font-medium">Action Movies</span>
                    </div>
                  </Link>
                  
                  <Link href="/search?q=comedy+movies" className="group bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors">
                    <div className="flex items-center gap-3">
                      <Film className="w-5 h-5 text-blue-500 group-hover:text-blue-400 transition-colors" />
                      <span className="text-white font-medium">Comedy Movies</span>
                    </div>
                  </Link>
                  
                  <Link href="/search?q=horror+movies" className="group bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors">
                    <div className="flex items-center gap-3">
                      <Film className="w-5 h-5 text-purple-500 group-hover:text-purple-400 transition-colors" />
                      <span className="text-white font-medium">Horror Movies</span>
                    </div>
                  </Link>
                  
                  <Link href="/search?q=romantic+movies" className="group bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors">
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-pink-500 group-hover:text-pink-400 transition-colors" />
                      <span className="text-white font-medium">Romantic Movies</span>
                    </div>
                  </Link>
                  
                  {/* Popular Searches */}
                  <Link href="/search?q=new+releases" className="group bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-green-500 group-hover:text-green-400 transition-colors" />
                      <span className="text-white font-medium">New Releases</span>
                    </div>
                  </Link>
                  
                  <Link href="/search?q=trending+now" className="group bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-orange-500 group-hover:text-orange-400 transition-colors" />
                      <span className="text-white font-medium">Trending Now</span>
                    </div>
                  </Link>
                  
                  <Link href="/search?q=top+rated" className="group bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors">
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                      <span className="text-white font-medium">Top Rated</span>
                    </div>
                  </Link>
                  
                  <Link href="/search?q=coming+soon" className="group bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                      <span className="text-white font-medium">Coming Soon</span>
                    </div>
                  </Link>
                </div>
                
                {/* Popular TV Shows */}
                <div className="mt-12">
                  <div className="flex items-center gap-2 mb-6">
                    <Tv className="w-6 h-6 text-blue-500" />
                    <h3 className="text-xl font-semibold text-white">Popular TV Shows</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <Link href="/search?q=game+of+thrones" className="group bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors">
                      <span className="text-white font-medium">Game of Thrones</span>
                    </Link>
                    <Link href="/search?q=stranger+things" className="group bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors">
                      <span className="text-white font-medium">Stranger Things</span>
                    </Link>
                    <Link href="/search?q=the+witcher" className="group bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors">
                      <span className="text-white font-medium">The Witcher</span>
                    </Link>
                    <Link href="/search?q=the+mandalorian" className="group bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors">
                      <span className="text-white font-medium">The Mandalorian</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : data.results.length > 0 ? (
            <>
              <p className="text-gray-400 mb-6">
                Found {data.results.length} results
              </p>
              <MovieGrid movies={data.results} />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No movies found for "{query}". Try a different search term.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {data.total_pages > 1 && query && (
          <Pagination 
            currentPage={page} 
            totalPages={Math.min(data.total_pages, 500)} 
            basePath={`/search?q=${encodeURIComponent(query)}`}
          />
        )}

        {/* Ad Banner */}
        <AdBanner slot="search-bottom-banner" />
      </div>
    </div>
  );
}
