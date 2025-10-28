// TMDB API Configuration and Helper Functions

// Add TV show interfaces
export interface TVShow extends Omit<Movie, 'title' | 'release_date' | 'original_title' | 'video'> {
  name: string;
  first_air_date: string;
  original_name: string;
  origin_country: string[];
}

export type MediaItem = Movie | TVShow;

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || 'demo_key';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface Movie {
  id: number;
  title: string;
  name?: string; // For TV shows
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string; // For TV shows
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title?: string;
  original_name?: string; // For TV shows
  video?: boolean;
  media_type?: 'movie' | 'tv';
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string; logo_path: string | null }[];
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
}

export interface Review {
  id: string;
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
}

export interface Genre {
  id: number;
  name: string;
}

// Helper function to build API URL
const buildUrl = (endpoint: string, params?: Record<string, string | number>) => {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', TMDB_API_KEY);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }
  
  return url.toString();
};

// Get image URL
export const getImageUrl = (path: string | null, size: 'w200' | 'w300' | 'w500' | 'w780' | 'original' = 'w500') => {
  if (!path) return '/placeholder-movie.jpg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

// Fetch popular TV shows
export const getPopularTVShows = async (page: number = 1): Promise<{ results: TVShow[]; total_pages: number }> => {
  try {
    const response = await fetch(buildUrl('/tv/popular', { page }), {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) throw new Error('Failed to fetch popular TV shows');
    return await response.json();
  } catch (error) {
    console.error('Error fetching popular TV shows:', error);
    return { results: [], total_pages: 0 };
  }
};

// Fetch popular movies
export const getPopularMovies = async (page: number = 1): Promise<{ results: Movie[]; total_pages: number }> => {
  try {
    const response = await fetch(buildUrl('/movie/popular', { page }), {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) throw new Error('Failed to fetch popular movies');
    return await response.json();
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return { results: [], total_pages: 0 };
  }
};

// Fetch trending movies
export const getTrendingMovies = async (timeWindow: 'day' | 'week' = 'week'): Promise<{ results: Movie[] }> => {
  try {
    const response = await fetch(buildUrl(`/trending/movie/${timeWindow}`), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) throw new Error('Failed to fetch trending movies');
    return await response.json();
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return { results: [] };
  }
};

// Fetch movie details
export const getMovieDetails = async (movieId: number): Promise<MovieDetails | null> => {
  try {
    const response = await fetch(buildUrl(`/movie/${movieId}`), {
      next: { revalidate: 86400 } // Cache for 24 hours
    });
    
    if (!response.ok) throw new Error('Failed to fetch movie details');
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

// Fetch movie reviews
export const getMovieReviews = async (movieId: number, page: number = 1): Promise<{ results: Review[]; total_pages: number }> => {
  try {
    const response = await fetch(buildUrl(`/movie/${movieId}/reviews`, { page }), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) throw new Error('Failed to fetch movie reviews');
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    return { results: [], total_pages: 0 };
  }
};

// Fetch similar movies
export const getSimilarMovies = async (movieId: number): Promise<{ results: Movie[] }> => {
  try {
    const response = await fetch(buildUrl(`/movie/${movieId}/similar`), {
      next: { revalidate: 86400 }
    });
    
    if (!response.ok) throw new Error('Failed to fetch similar movies');
    return await response.json();
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    return { results: [] };
  }
};

// Fetch movies by genre
export const getMoviesByGenre = async (genreId: number, page: number = 1): Promise<{ results: Movie[]; total_pages: number }> => {
  try {
    const response = await fetch(buildUrl('/discover/movie', { 
      with_genres: genreId,
      page,
      sort_by: 'popularity.desc'
    }), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) throw new Error('Failed to fetch movies by genre');
    return await response.json();
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return { results: [], total_pages: 0 };
  }
};

// Fetch all genres
export const getGenres = async (): Promise<{ genres: Genre[] }> => {
  try {
    const response = await fetch(buildUrl('/genre/movie/list'), {
      next: { revalidate: 604800 } // Cache for 1 week
    });
    
    if (!response.ok) throw new Error('Failed to fetch genres');
    return await response.json();
  } catch (error) {
    console.error('Error fetching genres:', error);
    return { genres: [] };
  }
};

// Search movies and TV shows
export const searchMulti = async (query: string, page: number = 1): Promise<{ results: MediaItem[]; total_pages: number }> => {
  try {
    const params: Record<string, string | number> = { 
      query, 
      page,
    };
    
    // Only include adult parameter if not in development
    if (process.env.NODE_ENV !== 'development') {
      params.include_adult = 'false';
    }
    
    const response = await fetch(buildUrl('/search/multi', params), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) throw new Error('Failed to search');
    return await response.json();
  } catch (error) {
    console.error('Error searching:', error);
    return { results: [], total_pages: 0 };
  }
};

// Search movies
export const searchMovies = async (query: string, page: number = 1): Promise<{ results: Movie[]; total_pages: number }> => {
  try {
    const response = await fetch(buildUrl('/search/movie', { query, page }), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) throw new Error('Failed to search movies');
    return await response.json();
  } catch (error) {
    console.error('Error searching movies:', error);
    return { results: [], total_pages: 0 };
  }
};

// Fetch now playing movies
export const getNowPlayingMovies = async (page: number = 1): Promise<{ results: Movie[]; total_pages: number }> => {
  try {
    const response = await fetch(buildUrl('/movie/now_playing', { page }), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) throw new Error('Failed to fetch now playing movies');
    return await response.json();
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    return { results: [], total_pages: 0 };
  }
};

// Fetch upcoming movies
export const getUpcomingMovies = async (page: number = 1): Promise<{ results: Movie[]; total_pages: number }> => {
  try {
    const response = await fetch(buildUrl('/movie/upcoming', { page }), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) throw new Error('Failed to fetch upcoming movies');
    return await response.json();
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return { results: [], total_pages: 0 };
  }
};

// Fetch top rated movies
export const getTopRatedMovies = async (page: number = 1): Promise<{ results: Movie[]; total_pages: number }> => {
  try {
    const response = await fetch(buildUrl('/movie/top_rated', { page }), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) throw new Error('Failed to fetch top rated movies');
    return await response.json();
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return { results: [], total_pages: 0 };
  }
};

// TV Show Interfaces
export interface TVShowDetails extends TVShow {
  created_by: Array<{
    id: number;
    name: string;
    profile_path: string | null;
  }>;
  episode_run_time: number[];
  genres: Genre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
  } | null;
  name: string;
  networks: Array<{
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }>;
  next_episode_to_air: null | any;
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  seasons: Array<{
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }>;
  status: string;
  tagline: string;
  type: string;
}

// Fetch TV show details
export const getTVShowDetails = async (tvShowId: number): Promise<TVShowDetails> => {
  try {
    const response = await fetch(buildUrl(`/tv/${tvShowId}`, {
      append_to_response: 'credits,similar,videos,images,external_ids'
    }), { next: { revalidate: 3600 } });
    
    if (!response.ok) throw new Error('Failed to fetch TV show details');
    return await response.json();
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    throw error;
  }
};

// Fetch similar TV shows
export const getSimilarTVShows = async (tvShowId: number, page: number = 1): Promise<{ results: TVShow[]; total_pages: number }> => {
  try {
    const response = await fetch(buildUrl(`/tv/${tvShowId}/similar`, { page }), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) throw new Error('Failed to fetch similar TV shows');
    return await response.json();
  } catch (error) {
    console.error('Error fetching similar TV shows:', error);
    return { results: [], total_pages: 0 };
  }
};

// Fetch TV show videos (trailers, teasers, etc.)
export const getTVShowVideos = async (tvShowId: number): Promise<{ results: Array<{
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}> }> => {
  try {
    const response = await fetch(buildUrl(`/tv/${tvShowId}/videos`), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) throw new Error('Failed to fetch TV show videos');
    return await response.json();
  } catch (error) {
    console.error('Error fetching TV show videos:', error);
    return { results: [] };
  }
};
