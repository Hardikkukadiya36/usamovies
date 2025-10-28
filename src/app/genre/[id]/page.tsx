import { Metadata } from "next";
import { getMoviesByGenre, getGenres } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import AdBanner from "@/components/AdBanner";
import Pagination from "@/components/Pagination";
import { notFound } from 'next/navigation';

interface GenrePageProps {
  params: {
    id: string;
  };
  searchParams: {
    page?: string;
  };
}

export async function generateMetadata({ params }: GenrePageProps): Promise<Metadata> {
  try {
    const genresData = await getGenres();
    const genre = genresData.genres.find(g => g.id === parseInt(params.id));
    
    if (!genre) {
      return {
        title: 'Genre Not Found - 123Movies',
        description: 'The requested genre could not be found.',
      };
    }
    
    return {
      title: `Watch ${genre.name} Movies Online Free in HD - 123Movies`,
      description: `Stream the best ${genre.name} movies online free. Watch ${genre.name} films in HD quality without registration.`,
      keywords: `${genre.name} movies, watch ${genre.name} online, ${genre.name} films, free ${genre.name} streaming`,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Genre - 123Movies',
      description: 'Browse movies by genre on 123Movies.',
    };
  }
}

export default async function GenrePage({ params, searchParams }: GenrePageProps) {
  try {
    const genreId = parseInt(params.id);
    const page = Math.max(1, parseInt(searchParams.page || '1'));
    
    // Fetch genre data first to validate the genre exists
    const genresData = await getGenres();
    const genre = genresData.genres.find(g => g.id === genreId);
    
    // If genre doesn't exist, return 404
    if (!genre) {
      notFound();
    }
    
    // Then fetch the movies for this genre
    const data = await getMoviesByGenre(genreId, page);

    return (
      <div className="min-h-screen bg-gray-950">
        <div className="container-custom py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {genre.name} Movies
            </h1>
            <p className="text-gray-400 text-lg">
              Explore the best {genre.name.toLowerCase()} movies. Watch in HD quality for free.
            </p>
          </div>

          {/* Ad Banner */}
          <AdBanner slot="genre-top-banner" />

          {/* Movies Grid */}
          <div className="my-12">
            {data.results.length > 0 ? (
              <MovieGrid movies={data.results} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No movies found in this genre.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {data.total_pages > 1 && (
            <Pagination 
              currentPage={page} 
              totalPages={Math.min(data.total_pages, 500)} 
              basePath={`/genre/${genreId}`}
            />
          )}

          {/* Ad Banner */}
          <AdBanner slot="genre-bottom-banner" />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in GenrePage:', error);
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Oops! Something went wrong.</h1>
          <p className="text-gray-400 text-lg">We're having trouble loading this genre. Please try again later.</p>
          <a 
            href="/genres" 
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Browse All Genres
          </a>
        </div>
      </div>
    );
  }
}
