import { getPopularTVShows } from '@/lib/tmdb';
import MovieGrid from '@/components/MovieGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TV Shows - 123Movies',
  description: 'Watch popular TV shows online for free on 123Movies. Stream the latest episodes of your favorite TV series in HD quality.',
  keywords: 'tv shows, watch tv series, free tv shows, stream tv online, 123movies tv shows',
};

export default async function TVShowsPage() {
  const { results: tvShows } = await getPopularTVShows();

  return (
    <div className="min-h-screen bg-[#0d1117] text-white py-12">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#2ea043]">Popular TV Shows</h1>
        <MovieGrid movies={tvShows} type="tv" />
      </div>
    </div>
  );
}
