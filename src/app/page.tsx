import Hero from "@/components/Hero";
import MovieGrid from "@/components/MovieGrid";
import AdBanner from "@/components/AdBanner";
import TrendingSection from "@/components/TrendingSection";
import GenreSection from "@/components/GenreSection";
import RelatedLinks from "@/components/RelatedLinks";
import { getPopularMovies, getTrendingMovies } from "@/lib/tmdb";

export default async function Home() {
  const [popularData, trendingData] = await Promise.all([
    getPopularMovies(1),
    getTrendingMovies('week')
  ]);
  return (
    <div className="bg-gradient-dark">
      <Hero />
      
      {/* Top Ad Banner */}
      <AdBanner slot="top-banner" />
      
      {/* Trending Movies */}
      <section className="container-custom py-12">
        <TrendingSection movies={trendingData.results.slice(0, 4)} />
      </section>

      {/* Middle Ad Banner */}
      <AdBanner slot="middle-banner" />

      {/* Latest Movies */}
      <section className="container-custom py-12">
        <h2 className="text-3xl font-bold mb-8 text-gradient">Latest Movies 2024</h2>
        <MovieGrid movies={popularData.results.slice(0, 10)} />
      </section>

      {/* Genre Section */}
      <section className="container-custom py-12">
        <GenreSection />
      </section>

      {/* Quick Links Section */}
      <section className="container-custom py-12">
        <h2 className="text-3xl font-bold mb-8 text-white">Explore More</h2>
        <RelatedLinks />
      </section>

      {/* Bottom Ad Banner */}
      <AdBanner slot="bottom-banner" />

      {/* SEO Content Section */}
      <section className="container-custom py-12">
        <div className="bg-gray-900 rounded-lg p-8 space-y-6">
          <h2 className="text-3xl font-bold text-white">Watch Free Movies Online in HD - 123Movies</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed">
              Welcome to <strong>123Movies</strong>, your premier destination for watching free movies online in stunning HD quality. 
              Stream the latest Hollywood blockbusters, Bollywood hits, and trending TV shows without any registration or subscription fees.
            </p>
            
            <h3 className="text-2xl font-semibold text-white mt-6 mb-4">Why Choose 123Movies?</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside">
              <li><strong>100% Free Streaming</strong> - Watch unlimited movies and TV shows without paying a dime</li>
              <li><strong>HD Quality</strong> - Enjoy crystal-clear video quality up to 1080p</li>
              <li><strong>No Registration Required</strong> - Start watching instantly without creating an account</li>
              <li><strong>Latest Releases</strong> - Access the newest movies and episodes as soon as they're available</li>
              <li><strong>Huge Library</strong> - Thousands of movies and TV shows across all genres</li>
              <li><strong>Mobile Friendly</strong> - Watch on any device - phone, tablet, or computer</li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-6 mb-4">Popular Categories</h3>
            <p className="text-gray-300 leading-relaxed">
              Explore our extensive collection of <strong>action movies</strong>, <strong>comedy films</strong>, 
              <strong> horror movies</strong>, <strong>romance</strong>, <strong>thriller</strong>, 
              <strong> sci-fi</strong>, and <strong>drama</strong>. We update our library daily with the latest releases 
              from Hollywood, Bollywood, and international cinema.
            </p>

            <h3 className="text-2xl font-semibold text-white mt-6 mb-4">Stream Movies Online Free</h3>
            <p className="text-gray-300 leading-relaxed">
              123Movies offers the best free movie streaming experience with no hidden costs. Watch your favorite 
              movies and TV shows online without downloading. Our platform is optimized for seamless streaming on 
              all devices with fast loading times and minimal buffering.
            </p>

            <div className="bg-gray-800 p-6 rounded-lg mt-6">
              <h4 className="text-xl font-semibold text-white mb-3">Trending Searches</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "watch movies online free",
                  "free movie streaming",
                  "HD movies online",
                  "latest movies 2024",
                  "Hollywood movies",
                  "Bollywood movies",
                  "TV shows online",
                  "web series free",
                  "action movies",
                  "comedy movies"
                ].map((keyword) => (
                  <span key={keyword} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
