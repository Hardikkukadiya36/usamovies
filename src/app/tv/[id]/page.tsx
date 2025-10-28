import { getTVShowDetails, getSimilarTVShows, getTVShowVideos } from '@/lib/tmdb';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Play, Star, Calendar, Clock, Tv, Film, List, Info, ThumbsUp, Share2 } from 'lucide-react';
import Link from 'next/link';
import { getImageUrl } from '@/lib/tmdb';

interface TVShowPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: TVShowPageProps): Promise<Metadata> {
  try {
    const tvShow = await getTVShowDetails(parseInt(params.id));
    
    return {
      title: `${tvShow.name} (${new Date(tvShow.first_air_date).getFullYear()}) - Watch Online - 123Movies`,
      description: tvShow.overview || `Watch ${tvShow.name} online free in HD on 123Movies.`,
      keywords: `${tvShow.name}, watch ${tvShow.name} online, ${tvShow.name} full episodes, ${tvShow.genres?.map(g => g.name).join(', ')}, free tv shows`,
      openGraph: {
        title: `${tvShow.name} (${new Date(tvShow.first_air_date).getFullYear()})`,
        description: tvShow.overview || `Watch ${tvShow.name} online free in HD on 123Movies.`,
        images: [
          {
            url: getImageUrl(tvShow.backdrop_path || tvShow.poster_path, 'original'),
            width: 1200,
            height: 630,
            alt: tvShow.name,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: 'TV Show Not Found - 123Movies',
      description: 'The requested TV show could not be found.',
    };
  }
}

export default async function TVShowPage({ params }: TVShowPageProps) {
  try {
    const tvShowId = parseInt(params.id);
    const [tvShow, similarShows, videos] = await Promise.all([
      getTVShowDetails(tvShowId),
      getSimilarTVShows(tvShowId, 1),
      getTVShowVideos(tvShowId)
    ]);

    // Find the first trailer or teaser video
    const trailer = videos.results.find(
      (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
    );

    return (
      <div className="min-h-screen bg-[#0d1117] text-white">
        {/* Hero Section */}
        <div className="relative h-[70vh] max-h-[800px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent z-10" />
          <Image
            src={getImageUrl(tvShow.backdrop_path, 'original')}
            alt={tvShow.name}
            fill
            className="object-cover object-center"
            priority
          />
          
          <div className="container-custom relative z-20 h-full flex flex-col justify-end pb-16">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{tvShow.name}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span>{tvShow.vote_average.toFixed(1)}</span>
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-1" />
                  <span>{new Date(tvShow.first_air_date).getFullYear()}</span>
                  {tvShow.last_air_date && (
                    <span> - {new Date(tvShow.last_air_date).getFullYear()}</span>
                  )}
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <Tv className="w-5 h-5 mr-1" />
                  <span>{tvShow.number_of_seasons} Season{tvShow.number_of_seasons !== 1 ? 's' : ''}</span>
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <Film className="w-5 h-5 mr-1" />
                  <span>{tvShow.episode_run_time?.[0] || 'N/A'} min</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {tvShow.genres?.map((genre) => (
                  <Link 
                    key={genre.id} 
                    href={`/genre/${genre.id}`}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
              
              <p className="text-lg text-gray-300 mb-6">{tvShow.overview}</p>
              
              <div className="flex flex-wrap gap-4">
                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#2ea043] hover:bg-[#2ea043]/90 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    Watch Trailer
                  </a>
                )}
                <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                  <List className="w-5 h-5" />
                  Add to List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-custom py-12">
          {/* Similar TV Shows */}
          {similarShows.results.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Similar TV Shows</h2>
                <Link href={`/tv/${tvShowId}/similar`} className="text-[#2ea043] hover:underline">
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {similarShows.results.slice(0, 5).map((show: any) => (
                  <div key={show.id} className="group">
                    <Link href={`/tv/${show.id}`}>
                      <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                        <Image
                          src={getImageUrl(show.poster_path, 'w500')}
                          alt={show.name}
                          fill
                          className="object-cover group-hover:opacity-80 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="bg-white/80 rounded-full p-2">
                            <Play className="w-6 h-6 text-black" />
                          </div>
                        </div>
                      </div>
                      <h3 className="font-medium text-sm md:text-base group-hover:text-[#2ea043] transition-colors">
                        {show.name}
                      </h3>
                      <div className="flex items-center text-xs text-gray-400">
                        <span>{new Date(show.first_air_date).getFullYear()}</span>
                        <span className="mx-1">•</span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                          <span>{show.vote_average.toFixed(1)}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4">About {tvShow.name}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-300">Overview</h4>
                  <p className="text-gray-400">{tvShow.overview}</p>
                </div>
                
                {tvShow.created_by && tvShow.created_by.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-300">Created By</h4>
                    <p className="text-gray-400">
                      {tvShow.created_by.map((creator: any) => creator.name).join(', ')}
                    </p>
                  </div>
                )}
                
                {tvShow.networks && tvShow.networks.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-300">Networks</h4>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {tvShow.networks.map((network: any) => (
                        <div key={network.id} className="flex items-center">
                          {network.logo_path && (
                            <div className="relative w-8 h-8 mr-2">
                              <Image
                                src={getImageUrl(network.logo_path, 'w300')}
                                alt={network.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          )}
                          <span className="text-gray-400">{network.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Details</h3>
              <div className="space-y-4">
                {tvShow.status && (
                  <div>
                    <h4 className="font-medium text-gray-300">Status</h4>
                    <p className="text-gray-400">{tvShow.status}</p>
                  </div>
                )}
                
                {tvShow.original_language && (
                  <div>
                    <h4 className="font-medium text-gray-300">Original Language</h4>
                    <p className="text-gray-400">
                      {new Intl.DisplayNames(['en'], { type: 'language' }).of(tvShow.original_language)}
                    </p>
                  </div>
                )}
                
                {tvShow.number_of_episodes > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-300">Episodes</h4>
                    <p className="text-gray-400">{tvShow.number_of_episodes} episodes</p>
                  </div>
                )}
                
                {tvShow.production_companies && tvShow.production_companies.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-300">Production Companies</h4>
                    <p className="text-gray-400">
                      {tvShow.production_companies.map((company: any) => company.name).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    notFound();
  }
}
