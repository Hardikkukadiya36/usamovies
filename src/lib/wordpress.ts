export interface Post {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
  date: string;
  modified: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    author?: Array<{
      name: string;
      avatar_urls?: {
        [key: string]: string;
      };
    }>;
  };
}

export async function getPosts({
  perPage = 10,
  page = 1,
  include = ['wp:featuredmedia', 'author'],
  slug,
}: {
  perPage?: number;
  page?: number;
  include?: string[];
  slug?: string;
} = {}): Promise<Post[]> {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  
  if (!apiUrl) {
    throw new Error('WordPress API URL is not configured. Please set NEXT_PUBLIC_WORDPRESS_API_URL in your environment variables.');
  }

  try {
    const params = new URLSearchParams({
      _embed: include.join(','),
      per_page: perPage.toString(),
      page: page.toString(),
      ...(slug && { slug }),
    });

    const url = `${apiUrl}/wp/v2/posts?${params.toString()}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    
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

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts({ perPage: 1, slug });
  return posts[0] || null;
}
