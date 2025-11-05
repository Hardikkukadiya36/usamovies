import { MetadataRoute } from 'next';
import { getGenres, getPopularMovies, getTopRatedMovies, getUpcomingMovies, getNowPlayingMovies } from '@/lib/tmdb';

// Function to fetch all movies from different categories
async function getAllMovies() {
  const allMovies = new Map<number, any>();
  const categories = ['popular', 'top_rated', 'upcoming', 'now_playing'];
  
  // Fetch movies from each category (5 pages each)
  for (const category of categories) {
    console.log(`Fetching ${category} movies...`);
    
    for (let page = 1; page <= 5; page++) {
      console.log(`  - Page ${page}`);
      let moviesData;
      
      try {
        // Use the appropriate function based on the category
        switch (category) {
          case 'popular':
            moviesData = await getPopularMovies(page);
            break;
          case 'top_rated':
            moviesData = await getTopRatedMovies(page);
            break;
          case 'upcoming':
            moviesData = await getUpcomingMovies(page);
            break;
          case 'now_playing':
            moviesData = await getNowPlayingMovies(page);
            break;
        }
        
        // Add movies to our map (using ID as key to avoid duplicates)
        if (moviesData?.results) {
          moviesData.results.forEach((movie: any) => {
            if (!allMovies.has(movie.id)) {
              allMovies.set(movie.id, movie);
            }
          });
        }
      } catch (error) {
        console.error(`Error fetching ${category} movies (page ${page}):`, error);
        // Continue with the next page if one fails
        continue;
      }
    }
  }
  
  console.log(`Fetched ${allMovies.size} unique movies`);
  return Array.from(allMovies.values());
}

// Helper function to create URL-friendly slugs from movie titles
function createSlug(title: string): string {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/--+/g, '-')      // Replace multiple hyphens with a single one
    .trim();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://123movies.com'; // Replace with your actual domain
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/movies`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/trending`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/genres`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  try {
    // Get genres for genre pages
    const genresData = await getGenres();
    const genrePages = genresData.genres.map((genre) => ({
      url: `${baseUrl}/genre/${genre.id}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }));

    // Get all movies for movie detail pages
    console.log('Fetching all movies for sitemap...');
    const allMovies = await getAllMovies();
    console.log(`Adding ${allMovies.length} movies to sitemap...`);
    
    const moviePages: MetadataRoute.Sitemap = allMovies.map((movie) => ({
      url: `${baseUrl}/movie/${movie.id}-${createSlug(movie.title || 'movie')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      // Add additional metadata for better indexing
      images: movie.poster_path ? [`https://image.tmdb.org/t/p/w500${movie.poster_path}`] : [],
      ...(movie.overview && { description: movie.overview }),
      ...(movie.release_date && { 
        publishedTime: new Date(movie.release_date).toISOString() 
      })
    }));

    return [...staticPages, ...genrePages, ...moviePages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}
