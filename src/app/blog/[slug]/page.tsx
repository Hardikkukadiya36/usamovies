import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Types for WordPress post
type Post = {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  modified: string;
  _embedded?: {
    author?: Array<{
      name: string;
      avatar_urls?: {
        [key: string]: string;
      };
    }>;
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
};

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post: Post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title.rendered} | Blog`,
    description: post.content.rendered.replace(/<[^>]*>?/gm, '').substring(0, 160),
  };
}

async function getPost(slug: string): Promise<Post> {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  
  if (!apiUrl) {
    throw new Error('WordPress API URL is not configured. Please set NEXT_PUBLIC_WORDPRESS_API_URL in your environment variables.');
  }

  try {
    const res = await fetch(
      `${apiUrl}/wp/v2/posts?slug=${slug}&_embed`,
      { next: { revalidate: 60 } } // Revalidate every 60 seconds
    );

    if (!res.ok) {
      const errorData = await res.text();
      console.error('WordPress API Error:', errorData);
      throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`);
    }

    const posts: Post[] = await res.json();
    if (!posts || posts.length === 0) {
      throw new Error('Post not found');
    }
    
    return posts[0];
  } catch (error) {
    console.error('Error fetching WordPress post:', error);
    throw new Error('Failed to load the blog post. The post might not exist or there might be an issue with the connection.');
  }
}

export default async function BlogPost({ params }: Params) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const author = post._embedded?.author?.[0];
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        
        <div className="flex items-center text-gray-600 text-sm mb-6">
          {author && (
            <div className="flex items-center mr-6">
              {author.avatar_urls?.['24'] && (
                <img 
                  src={author.avatar_urls['24']} 
                  alt={author.name}
                  className="w-6 h-6 rounded-full mr-2"
                />
              )}
              <span>By {author.name}</span>
            </div>
          )}
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.date !== post.modified && (
            <span className="ml-4 text-xs text-gray-500">
              Updated: {new Date(post.modified).toLocaleDateString()}
            </span>
          )}
        </div>

        {featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={featuredImage.source_url} 
              alt={featuredImage.alt_text || post.title.rendered}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        )}
      </header>

      <div 
        className="prose max-w-none prose-lg"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      <div className="mt-12 pt-6 border-t border-gray-200">
        <a 
          href="/blog" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to all posts
        </a>
      </div>
    </article>
  );
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  
  if (!apiUrl) {
    console.warn('WordPress API URL is not configured. Static generation of blog posts will be skipped.');
    return [];
  }

  try {
    const res = await fetch(`${apiUrl}/wp/v2/posts?per_page=100`);
    
    if (!res.ok) {
      console.error('Failed to fetch posts for static generation:', res.status, res.statusText);
      return [];
    }
    
    const posts = await res.json();
    return posts.map((post: any) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error during static generation of blog posts:', error);
    return [];
  }
}
