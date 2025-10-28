import { Metadata } from "next";
import { getPopularMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import AdBanner from "@/components/AdBanner";
import Pagination from "@/components/Pagination";

export const metadata: Metadata = {
  title: "Watch Latest Movies Online Free in HD - 123Movies",
  description: "Browse and watch the latest movies online free in HD quality. Thousands of movies available to stream without registration.",
  keywords: "watch movies online, latest movies, new movies 2024, HD movies, free streaming",
};

interface MoviesPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const page = parseInt(searchParams.page || '1');
  const data = await getPopularMovies(page);

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest Movies
          </h1>
          <p className="text-gray-400 text-lg">
            Discover and watch the latest movies in HD quality. Updated daily with new releases.
          </p>
        </div>

        {/* Ad Banner */}
        <AdBanner slot="movies-top-banner" />

        {/* Movies Grid */}
        <div className="my-12">
          <MovieGrid movies={data.results} />
        </div>

        {/* Pagination */}
        <Pagination 
          currentPage={page} 
          totalPages={Math.min(data.total_pages, 500)} 
          basePath="/movies"
        />

        {/* Ad Banner */}
        <AdBanner slot="movies-bottom-banner" />

        {/* SEO Content */}
        <div className="mt-12 bg-gray-900 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Watch Latest Movies Online Free
          </h2>
          <div className="prose prose-invert max-w-none text-gray-300">
            <p className="mb-4">
              Welcome to the ultimate destination for watching the latest movies online free. 
              Our extensive collection features thousands of movies across all genres, from 
              action-packed blockbusters to heartwarming dramas.
            </p>
            <p className="mb-4">
              Stream movies in HD quality without any registration or subscription fees. 
              We update our library daily with the newest releases, ensuring you never miss 
              out on the hottest movies of 2024.
            </p>
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">
              Why Choose 123Movies?
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>100% Free - No hidden costs or subscriptions</li>
              <li>HD Quality - Crystal clear video up to 1080p</li>
              <li>No Registration - Start watching instantly</li>
              <li>Daily Updates - New movies added every day</li>
              <li>All Genres - Action, Comedy, Horror, Romance, and more</li>
              <li>Mobile Friendly - Watch on any device</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
