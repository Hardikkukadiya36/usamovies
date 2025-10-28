# TMDB API Setup Guide

## 🎬 The Movie Database (TMDB) API Integration

Your 123Movies website now uses **real movie data** from The Movie Database (TMDB) API!

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Get Your TMDB API Key

1. **Create Account**
   - Go to https://www.themoviedb.org/signup
   - Sign up for a free account
   - Verify your email

2. **Request API Key**
   - Go to https://www.themoviedb.org/settings/api
   - Click "Request an API Key"
   - Choose "Developer" option
   - Fill out the form:
     - **Application Name**: 123Movies Website
     - **Application URL**: Your website URL (or http://localhost:3000 for testing)
     - **Application Summary**: Movie streaming information website
   - Accept terms and submit

3. **Get Your Keys**
   - You'll receive two keys:
     - **API Key (v3 auth)**: `abc123def456...` (32 characters)
     - **API Read Access Token (v4 auth)**: `eyJhbGc...` (longer token)

### Step 2: Add API Key to Your Project

1. **Create `.env.local` file** in the project root:
   ```bash
   # In: d:/wind/movie-streaming-site/.env.local
   NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
   ```

2. **Replace `your_api_key_here`** with your actual API key

3. **Restart the development server**:
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

### Step 3: Verify It Works

1. Open http://localhost:3000
2. You should see real movie posters and data
3. If you see "demo_key" errors, check your `.env.local` file

---

## 📁 What's Been Created

### New Pages with Real Data

1. **Homepage** (`/`)
   - Trending movies from TMDB
   - Popular movies grid
   - Real movie posters and ratings

2. **Movie Detail Page** (`/movie/[id]`)
   - Full movie information
   - User reviews from TMDB
   - Similar movies recommendations
   - Backdrop images and posters

3. **Movies Listing** (`/movies`)
   - Paginated list of popular movies
   - 20 movies per page
   - Up to 500 pages

4. **Genre Pages** (`/genre/[id]`)
   - Movies filtered by genre
   - Action, Comedy, Horror, etc.
   - Paginated results

5. **Trending Page** (`/trending`)
   - Most popular movies this week
   - Updated daily

6. **Search Page** (`/search`)
   - Search movies by title
   - Real-time results from TMDB

7. **Genres Listing** (`/genres`)
   - All available genres
   - Beautiful genre cards

### API Functions Created

Located in `src/lib/tmdb.ts`:

```typescript
// Available functions:
- getPopularMovies(page)
- getTrendingMovies(timeWindow)
- getMovieDetails(movieId)
- getMovieReviews(movieId, page)
- getSimilarMovies(movieId)
- getMoviesByGenre(genreId, page)
- getGenres()
- searchMovies(query, page)
- getNowPlayingMovies(page)
- getUpcomingMovies(page)
- getTopRatedMovies(page)
- getImageUrl(path, size)
```

---

## 🎨 Features Implemented

### Real Movie Data
- ✅ Movie titles, descriptions, ratings
- ✅ Release dates and runtime
- ✅ Genres and production info
- ✅ Budget and revenue data
- ✅ High-quality poster images
- ✅ Backdrop images for headers
- ✅ User reviews from TMDB community

### Smart Caching
- ✅ API responses cached for performance
- ✅ Movie details cached for 24 hours
- ✅ Popular/trending cached for 1 hour
- ✅ Reduces API calls and improves speed

### Image Optimization
- ✅ Next.js Image component for optimization
- ✅ Responsive images (different sizes for mobile/desktop)
- ✅ Lazy loading for better performance
- ✅ Automatic WebP conversion

### SEO Optimization
- ✅ Dynamic meta tags from movie data
- ✅ Unique titles and descriptions per movie
- ✅ Keywords from genres and movie info
- ✅ Open Graph images from movie posters

---

## 📊 API Usage & Limits

### Free Tier Limits
- **Requests**: 50 requests per second
- **Daily Limit**: No daily limit!
- **Rate Limit**: Very generous
- **Cost**: 100% FREE forever

### What You Can Do
- ✅ Unlimited movie searches
- ✅ Unlimited movie details
- ✅ Unlimited image downloads
- ✅ Commercial use allowed
- ✅ No credit card required

### Best Practices
1. **Cache responses** (already implemented)
2. **Don't make unnecessary requests**
3. **Use appropriate image sizes**
4. **Respect rate limits**

---

## 🔧 Customization Options

### Change Image Sizes

In `src/lib/tmdb.ts`, modify `getImageUrl()`:

```typescript
// Available sizes:
'w200'    // Small thumbnails
'w300'    // Medium thumbnails
'w500'    // Default posters
'w780'    // Large images
'original' // Full resolution
```

### Adjust Cache Duration

In API functions, modify `next: { revalidate: X }`:

```typescript
// Cache for 1 hour (3600 seconds)
next: { revalidate: 3600 }

// Cache for 24 hours
next: { revalidate: 86400 }

// No cache (always fresh)
next: { revalidate: 0 }
```

### Add More Endpoints

TMDB API has many more endpoints:
- TV Shows
- People (actors/directors)
- Collections
- Keywords
- Certifications
- And more!

Documentation: https://developers.themoviedb.org/3

---

## 🐛 Troubleshooting

### Problem: "Failed to fetch" errors

**Solution:**
1. Check your API key is correct
2. Verify `.env.local` file exists
3. Restart development server
4. Check internet connection

### Problem: Images not loading

**Solution:**
1. Check `next.config.mjs` has image domains
2. Verify TMDB image URLs are accessible
3. Check browser console for errors

### Problem: "Invalid API key" error

**Solution:**
1. Verify API key in `.env.local`
2. Make sure no extra spaces
3. Use v3 API key, not v4 token
4. Check key is active on TMDB website

### Problem: Slow loading

**Solution:**
1. Caching is already implemented
2. Check your internet speed
3. Consider using a CDN for images
4. Optimize image sizes

---

## 📈 Performance Tips

### 1. Image Optimization
```typescript
// Use appropriate sizes
getImageUrl(path, 'w300') // For thumbnails
getImageUrl(path, 'w500') // For cards
getImageUrl(path, 'w780') // For large displays
```

### 2. Pagination
- Limit results per page (20-30 items)
- Use TMDB's built-in pagination
- Don't load all pages at once

### 3. Caching Strategy
- Popular content: 1 hour cache
- Movie details: 24 hour cache
- Genres: 1 week cache (rarely changes)

### 4. Error Handling
- All API functions have try-catch
- Returns empty arrays on error
- Graceful degradation

---

## 🎯 Next Steps

### Add More Features

1. **TV Shows**
   ```typescript
   // Add to tmdb.ts
   export const getPopularTVShows = async (page = 1) => {
     const response = await fetch(
       buildUrl('/tv/popular', { page })
     );
     return await response.json();
   };
   ```

2. **Actor Pages**
   ```typescript
   export const getPersonDetails = async (personId: number) => {
     const response = await fetch(
       buildUrl(`/person/${personId}`)
     );
     return await response.json();
   };
   ```

3. **Movie Trailers**
   ```typescript
   export const getMovieVideos = async (movieId: number) => {
     const response = await fetch(
       buildUrl(`/movie/${movieId}/videos`)
     );
     return await response.json();
   };
   ```

### Enhance User Experience

1. **Watchlist Feature**
   - Save movies to local storage
   - User favorites
   - Recently watched

2. **Advanced Filters**
   - Filter by year
   - Filter by rating
   - Sort options

3. **Recommendations**
   - Based on viewing history
   - Personalized suggestions

---

## 📚 Resources

### Official Documentation
- **TMDB API Docs**: https://developers.themoviedb.org/3
- **API Reference**: https://developers.themoviedb.org/3/getting-started
- **Image Configuration**: https://developers.themoviedb.org/3/configuration

### Community
- **TMDB Forums**: https://www.themoviedb.org/talk
- **API Support**: https://www.themoviedb.org/talk/category/5047958519c29526b50017d6

### Tools
- **API Explorer**: https://developers.themoviedb.org/3/getting-started/introduction
- **Postman Collection**: Available on TMDB website

---

## ✅ Setup Checklist

- [ ] Created TMDB account
- [ ] Requested API key
- [ ] Created `.env.local` file
- [ ] Added API key to `.env.local`
- [ ] Restarted development server
- [ ] Verified real movie data is showing
- [ ] Tested movie detail pages
- [ ] Tested search functionality
- [ ] Tested genre filtering
- [ ] Images loading correctly

---

## 🎉 You're All Set!

Your 123Movies website now has:
- ✅ Real movie data from TMDB
- ✅ Thousands of movies to browse
- ✅ User reviews and ratings
- ✅ High-quality images
- ✅ Search functionality
- ✅ Genre filtering
- ✅ Trending movies
- ✅ Similar movie recommendations

**Start exploring your movie database! 🎬**

---

**Need Help?** Check the troubleshooting section or visit TMDB forums for support.
