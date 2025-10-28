import Link from 'next/link';
import { Metadata } from 'next';

// Types for WordPress post
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

export const metadata: Metadata = {
  title: 'Blog - Latest Articles',
  description: 'Read our latest blog posts and articles',
};

async function getPosts() {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  
  if (!apiUrl) {
    throw new Error('WordPress API URL is not configured. Please set NEXT_PUBLIC_WORDPRESS_API_URL in your environment variables.');
  }
  
  try {
    const res = await fetch(`${apiUrl}/wp/v2/posts?_embed&per_page=10`);
    
    if (!res.ok) {
      const errorData = await res.text();
      console.error('WordPress API Error:', errorData);
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    throw new Error('Failed to load blog posts. Please check your WordPress URL and try again.');
  }
}

export default async function BlogPage() {
  const posts: Post[] = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Blog Posts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={post._embedded['wp:featuredmedia'][0].source_url} 
                  alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                  {post.title.rendered}
                </Link>
              </h2>
              <div 
                className="text-gray-600 mb-4 line-clamp-3" 
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <div className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <Link 
                href={`/blog/${post.slug}`}
                className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
