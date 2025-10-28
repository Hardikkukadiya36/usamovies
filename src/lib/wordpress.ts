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
  categories: number[];
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

// Helper function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export async function getRelatedPosts(postId: number, categories: number[] = [], perPage: number = 3): Promise<Post[]> {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  
  if (!apiUrl) {
    console.warn('WordPress API URL is not configured. Related posts will not be loaded.');
    return [];
  }

  try {
    // First, fetch all posts (or a large number) to get a good pool
    const allPostsParams = new URLSearchParams({
      _embed: 'wp:featuredmedia,author',
      per_page: '20', // Fetch more posts to have a better random selection
      exclude: postId.toString(),
      orderby: 'date',
      order: 'desc',
    });

    const url = `${apiUrl}/wp/v2/posts?${allPostsParams.toString()}`;
    console.log('Fetching posts for related content:', url);
    
    const res = await fetch(url, { 
      next: { revalidate: 3600 } // Cache for 1 hour since we're randomizing anyway
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Failed to fetch posts:', {
        status: res.status,
        statusText: res.statusText,
        url,
        error: errorText
      });
      return [];
    }

    let posts = await res.json();
    
    // If we have categories, prioritize posts from the same categories
    if (categories && categories.length > 0) {
      // Split posts into two groups: matching categories and others
      const matchingCategoryPosts = posts.filter((post: Post) => 
        post.categories && post.categories.some(catId => categories.includes(catId))
      );
      
      const otherPosts = posts.filter((post: Post) => 
        !post.categories || !post.categories.some(catId => categories.includes(catId))
      );
      
      // Shuffle both groups
      const shuffledMatching = shuffleArray(matchingCategoryPosts);
      const shuffledOthers = shuffleArray(otherPosts);
      
      // Combine with priority to matching categories
      posts = [...shuffledMatching, ...shuffledOthers];
    } else {
      // No categories, just shuffle all posts
      posts = shuffleArray(posts);
    }
    
    // Return the requested number of posts
    return posts.slice(0, perPage);
  } catch (error) {
    console.error('Error in getRelatedPosts:', {
      error,
      postId,
      categories,
      apiUrl: apiUrl ? 'Set' : 'Not set'
    });
    return [];
  }
}
