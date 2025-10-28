import { Metadata } from "next";
import { getTrendingMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import AdBanner from "@/components/AdBanner";
import { TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Trending Movies This Week - Watch Popular Movies Online Free | 123Movies",
  description: "Watch the most trending and popular movies this week. Stream viral movies online free in HD quality.",
  keywords: "trending movies, popular movies, viral movies, most watched movies, trending now",
};

export default async function TrendingPage() {
  const data = await getTrendingMovies('week');

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <TrendingUp className="w-12 h-12 text-red-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Trending This Week
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Discover what everyone is watching. The most popular and trending movies of the week.
          </p>
        </div>

        {/* Ad Banner */}
        <AdBanner slot="trending-top-banner" />

        {/* Movies Grid */}
        <div className="my-12">
          <MovieGrid movies={data.results} />
        </div>

        {/* Ad Banner */}
        <AdBanner slot="trending-bottom-banner" />

        {/* SEO Content */}
        <div className="mt-12 bg-gray-900 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Watch Trending Movies Online Free
          </h2>
          <div className="prose prose-invert max-w-none text-gray-300">
            <p className="mb-4">
              Stay up-to-date with the most popular and trending movies of the week. 
              Our trending section is updated daily based on what viewers are watching 
              and loving right now.
            </p>
            <p>
              From viral blockbusters to hidden gems that are gaining traction, 
              discover the movies that everyone is talking about. Stream all trending 
              movies in HD quality without any registration or fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
