import { MetadataRoute } from 'next';
import { getGenres, getPopularMovies } from '@/lib/tmdb';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://123moviesfreestreaming.com'; // Replace with your actual domain
  
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

    // Get popular movies for movie detail pages (first 100 movies)
    const moviePages: MetadataRoute.Sitemap = [];
    for (let page = 1; page <= 5; page++) {
      const moviesData = await getPopularMovies(page);
      const pageMovies = moviesData.results.map((movie) => ({
        url: `${baseUrl}/movie/${movie.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
      moviePages.push(...pageMovies);
    }

    return [...staticPages, ...genrePages, ...moviePages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}
