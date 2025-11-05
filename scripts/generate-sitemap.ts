const { writeFile, mkdir } = require('fs').promises;
const { join } = require('path');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

// Function to create URL-friendly slugs from movie titles
function createSlug(title: string | undefined | null): string {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/--+/g, '-')      // Replace multiple hyphens with a single one
    .trim();
}

// Load environment variables from .env file
const envPath = path.join(__dirname, '..', '.env');
dotenv.config({ path: envPath });



// TMDB API configuration
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || process.env.TMDB_API_KEY;
if (!TMDB_API_KEY) {
  console.error('Available environment variables:', Object.keys(process.env).join(', '));
  throw new Error('TMDB API Key not found in environment variables. Please check your .env file.');
}

console.log('Using TMDB API Key:', TMDB_API_KEY ? '***' + TMDB_API_KEY.slice(-4) : 'Not found');

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Helper function to fetch from TMDB API
async function fetchFromTMDB(endpoint: string, params: Record<string, any> = {}) {
  const url = `${TMDB_BASE_URL}${endpoint}`;
  const response = await axios.get(url, {
    params: {
      api_key: TMDB_API_KEY,
      language: 'en-US',
      ...params,
    },
  });
  return response.data;
}

// Fetch movies from TMDB
async function fetchMovies(category: string, page: number = 1) {
  return fetchFromTMDB(`/movie/${category}`, { page });
}

const SITE_URL = 'https://123movies.com';
const SITEMAP_PATH = join(process.cwd(), 'public', 'sitemap.xml');
const ENV_PATH = join(process.cwd(), '.env');

// Load environment variables
dotenv.config({ path: ENV_PATH });

async function getAllMovies() {
  const movies = new Map<number, any>();
  
  // Fetch movies from different categories to get a diverse set
  const categories = [
    'popular',
    'top_rated',
    'upcoming',
    'now_playing',
  ];

  // Fetch up to 5 pages (100 movies) from each category
  for (const category of categories) {
    try {
      for (let page = 1; page <= 5; page++) {
        console.log(`Fetching ${category} movies page ${page}...`);
        const { results } = await fetchMovies(category, page);
        
        results.forEach((movie: any) => {
          if (!movies.has(movie.id)) {
            movies.set(movie.id, movie);
          }
        });
        
        // Small delay to avoid hitting rate limits
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } catch (error) {
      console.error(`Error fetching ${category} movies:`, error);
    }
  }

  return Array.from(movies.values());
}

function generateSitemap(movies: any[]) {
  const now = new Date().toISOString().split('T')[0];
  
  // Start of sitemap
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;

  // Add static pages
  const staticPages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: 'movies', priority: '0.9', changefreq: 'daily' },
    { path: 'tv-shows', priority: '0.9', changefreq: 'daily' },
    { path: 'genres', priority: '0.8', changefreq: 'weekly' },
    { path: 'trending', priority: '0.8', changefreq: 'daily' },
    { path: 'search', priority: '0.7', changefreq: 'monthly' },
    { path: 'about', priority: '0.5', changefreq: 'monthly' },
    { path: 'contact', priority: '0.5', changefreq: 'monthly' },
    { path: 'faq', priority: '0.5', changefreq: 'monthly' },
    { path: 'privacy', priority: '0.3', changefreq: 'yearly' },
    { path: 'terms', priority: '0.3', changefreq: 'yearly' },
    { path: 'disclaimer', priority: '0.3', changefreq: 'yearly' },
    { path: 'dmca', priority: '0.3', changefreq: 'yearly' },
    { path: 'blog', priority: '0.8', changefreq: 'daily' }
  ];

  // Add static pages to sitemap
  for (const page of staticPages) {
    sitemap += `  <url>
    <loc>${SITE_URL}/${page.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  }

  // Add movie pages to sitemap
  for (const movie of movies) {
    const movieSlug = createSlug(movie.title || movie.original_title || '');
    const movieUrl = `${SITE_URL}/movie/${movie.id}${movieSlug ? '-' + movieSlug : ''}`;
    
    sitemap += `  <url>
    <loc>${movieUrl}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://image.tmdb.org/t/p/w500${movie.poster_path}</image:loc>
      <image:title><![CDATA[${movie.title}]]></image:title>
    </image:image>
    <video:video>
      <video:title><![CDATA[${movie.title}]]></video:title>
      <video:thumbnail_loc>https://image.tmdb.org/t/p/w500${movie.poster_path}</video:thumbnail_loc>
      <video:description><![CDATA[${movie.overview || ''}]]></video:description>
    </video:video>
  </url>
`;
  }

  // End of sitemap
  sitemap += '</urlset>';
  return sitemap;
}

async function main() {
  try {
    console.log('Starting sitemap generation...');
    
    // Ensure public directory exists
    try {
      await mkdir(join(process.cwd(), 'public'), { recursive: true });
    } catch (error) {
      // Directory already exists
    }
    
    console.log('Fetching movies from TMDB...');
    const movies = await getAllMovies();
    console.log(`Fetched ${movies.length} unique movies`);
    
    console.log('Generating sitemap...');
    const sitemap = generateSitemap(movies);
    
    console.log('Writing sitemap to public/sitemap.xml...');
    await writeFile(SITEMAP_PATH, sitemap, 'utf-8');
    
    console.log('Sitemap generated successfully!');
    console.log(`Sitemap saved to: ${SITEMAP_PATH}`);
    console.log(`Total URLs in sitemap: ${movies.length + 13}`); // 13 static pages
  } catch (error) {
    console.error('Error generating sitemap:');
    if (error instanceof Error) {
      console.error(error.message);
      if (error.stack) {
        console.error(error.stack.split('\n').slice(0, 3).join('\n'));
      }
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error in main:', error);
  process.exit(1);
});
