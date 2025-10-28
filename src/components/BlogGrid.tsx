import Link from 'next/link';
import Image from 'next/image';

type Post = {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
};

interface BlogGridProps {
  posts: Post[];
  title?: string;
  maxPosts?: number;
  showViewAll?: boolean;
}

export default function BlogGrid({ 
  posts, 
  title = 'Latest Blog Posts',
  maxPosts = 3,
  showViewAll = true
}: BlogGridProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  const displayedPosts = posts.slice(0, maxPosts);

  return (
    <section className="container-custom py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        {showViewAll && (
          <Link 
            href="/blog" 
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            View All →
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedPosts.map((post) => (
          <article key={post.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
              <div className="h-48 relative">
                <Image
                  src={post._embedded['wp:featuredmedia'][0].source_url}
                  alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-white">
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="hover:text-blue-400 transition-colors line-clamp-2"
                >
                  {post.title.rendered}
                </Link>
              </h3>
              <div 
                className="text-gray-300 text-sm mb-4 line-clamp-3" 
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
