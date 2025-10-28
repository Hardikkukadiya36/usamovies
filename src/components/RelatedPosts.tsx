import Link from 'next/link';
import Image from 'next/image';

type Post = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
};

export default function RelatedPosts({ posts }: { posts: Post[] }) {
  // Debug: Log the posts being received
  console.log('RelatedPosts received:', posts);
  
  if (!posts || posts.length === 0) {
    console.log('No related posts to display');
    return (
      <div className="text-center py-4 text-gray-500">
        No related posts found.
      </div>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article key={post.id} className="group">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                  <div className="relative h-48">
                    <Image
                      src={post._embedded['wp:featuredmedia'][0].source_url}
                      alt={post._embedded['wp:featuredmedia'][0]?.alt_text || post.title.rendered}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 
                    className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
