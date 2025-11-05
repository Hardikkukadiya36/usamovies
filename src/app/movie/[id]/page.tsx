import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  getMovieDetails, 
  getMovieReviews, 
  getSimilarMovies, 
  getImageUrl 
} from "@/lib/tmdb";
import { Star, Calendar, Clock, Play, User } from "lucide-react";
import AdBanner from "@/components/AdBanner";
import MovieGrid from "@/components/MovieGrid";
import Breadcrumbs from "@/components/Breadcrumbs";

// Function to extract ID from slug (e.g., '123-movie-title' -> 123)
function extractIdFromSlug(slug: string): number {
  const match = slug.match(/^(\d+)/);
  if (!match) throw new Error('Invalid movie URL');
  return parseInt(match[1], 10);
}

interface MoviePageProps {
  params: {
    id: string; // This will be in format '123-movie-title'
  };
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const movieId = extractIdFromSlug(params.id);
  const movie = await getMovieDetails(movieId);
  
  if (!movie) {
    return {
      title: "Movie Not Found",
    };
  }

  return {
    title: `Watch ${movie.title}${movie.release_date ? ` (${new Date(movie.release_date).getFullYear()})` : ''} Online Free in HD - 123Movies`,
    description: `${movie.overview.substring(0, 155)}... Stream ${movie.title} online free in HD quality. Watch without registration.`,
    keywords: `watch ${movie.title} online free, ${movie.title} streaming, ${movie.title} full movie, ${movie.genres.map(g => g.name).join(', ')}`,
    openGraph: {
      title: `Watch ${movie.title} Online Free`,
      description: movie.overview,
      images: [getImageUrl(movie.backdrop_path, 'original')],
    },
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const movieId = extractIdFromSlug(params.id);
  
  const [movie, reviewsData, similarData] = await Promise.all([
    getMovieDetails(movieId),
    getMovieReviews(movieId),
    getSimilarMovies(movieId),
  ]);

  if (!movie) {
    notFound();
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
  const runtime = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Breadcrumbs */}
      <div className="container-custom pt-6">
        <Breadcrumbs 
          items={[
            { label: 'Movies', href: '/movies' },
            { label: movie.title }
          ]} 
        />
      </div>

      {/* Hero Section with Backdrop */}
      <div className="relative h-[500px] md:h-[600px]">
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent"></div>
        </div>

        <div className="relative container-custom h-full flex items-end pb-12">
          <div className="grid md:grid-cols-[300px_1fr] gap-8 w-full">
            {/* Poster */}
            <div className="hidden md:block">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Movie Info */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {movie.title}
              </h1>
              
              {movie.tagline && (
                <p className="text-xl text-gray-300 italic">{movie.tagline}</p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-yellow-600 text-white px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-white" />
                  <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
                  <span className="text-yellow-100">({movie.vote_count} votes)</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>{releaseYear}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>{runtime}</span>
                </div>

                <div className="flex gap-2">
                  {movie.genres.map((genre) => (
                    <Link
                      key={genre.id}
                      href={`/genre/${genre.id}`}
                      className="px-3 py-1 bg-gray-800 hover:bg-red-600 text-white rounded-full text-xs transition-colors"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>

              <button className="btn-primary flex items-center gap-2 text-lg">
                <Play className="w-6 h-6 fill-white" />
                Watch Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <AdBanner slot="movie-top-banner" />

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </section>

            {/* Reviews Section */}
            {reviewsData.results.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-6">User Reviews</h2>
                <div className="space-y-6">
                  {reviewsData.results.slice(0, 5).map((review) => (
                    <div key={review.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
                          {review.author[0].toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-semibold text-white">{review.author}</h3>
                            {review.author_details.rating && (
                              <div className="flex items-center gap-1 bg-yellow-600 text-white px-2 py-0.5 rounded text-xs">
                                <Star className="w-3 h-3 fill-white" />
                                <span>{review.author_details.rating}/10</span>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">
                            {new Date(review.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed line-clamp-6">
                        {review.content}
                      </p>
                      <button className="text-red-500 hover:text-red-400 text-sm mt-2">
                        Read more
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Movie Details */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400">Status:</span>
                  <span className="text-white ml-2">{movie.status}</span>
                </div>
                <div>
                  <span className="text-gray-400">Release Date:</span>
                  <span className="text-white ml-2">
                    {movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Runtime:</span>
                  <span className="text-white ml-2">{runtime}</span>
                </div>
                <div>
                  <span className="text-gray-400">Budget:</span>
                  <span className="text-white ml-2">
                    {movie.budget > 0 ? `$${(movie.budget / 1000000).toFixed(1)}M` : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Revenue:</span>
                  <span className="text-white ml-2">
                    {movie.revenue > 0 ? `$${(movie.revenue / 1000000).toFixed(1)}M` : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Language:</span>
                  <span className="text-white ml-2">{movie.original_language.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Ad Slot */}
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <p className="text-gray-500 text-sm mb-2">Advertisement</p>
              <div className="bg-gray-800 h-[250px] flex items-center justify-center">
                <span className="text-gray-600">300x250 Ad</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <AdBanner slot="movie-middle-banner" />

      {/* Similar Movies */}
      {similarData.results.length > 0 && (
        <section className="container-custom py-12">
          <h2 className="text-3xl font-bold text-white mb-8">Similar Movies</h2>
          <MovieGrid movies={similarData.results.slice(0, 10)} />
        </section>
      )}

      {/* Bottom Ad */}
      <AdBanner slot="movie-bottom-banner" />
    </div>
  );
}
