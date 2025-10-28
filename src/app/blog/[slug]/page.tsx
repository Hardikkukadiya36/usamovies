import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostBySlug, getPosts, getRelatedPosts, Post } from '@/lib/wordpress';
import dynamic from 'next/dynamic';
import RelatedPosts from '@/components/RelatedPosts';
import FeaturedImage from '@/components/FeaturedImage';
import BlogContent from '@/components/BlogContent';

// Dynamically import the TableOfContents component with no SSR
const TableOfContents = dynamic(
  () => import('@/components/TableOfContents'),
  { ssr: false }
);

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
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


export default async function BlogPost({ params }: Params) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const author = post._embedded?.author?.[0];
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
  
  // Debug logging
  console.log('Post categories:', post.categories);
  console.log('Featured image data:', {
    hasFeaturedImage: !!featuredImage,
    sourceUrl: featuredImage?.source_url,
    altText: featuredImage?.alt_text,
    embeddedMedia: post._embedded?.['wp:featuredmedia']
  });
  
  // Get the best available image URL
  const featuredImageUrl = featuredImage?.source_url || '';
  
  // Get related posts based on categories
  const relatedPosts = await getRelatedPosts(post.id, post.categories || [], 3);
  console.log('Related posts:', relatedPosts);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-8">
        <article className="w-full lg:w-3/4 xl:w-4/5 bg-white p-6 rounded-lg shadow-sm">
      <header className="mb-8 prose max-w-none">
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

        <div className="mb-8 rounded-lg overflow-hidden">
          <FeaturedImage 
            src={featuredImageUrl}
            alt={featuredImage?.alt_text || post.title.rendered}
            className="rounded-lg"
            width={1200}
            height={630}
          />
        </div>
      </header>

      <BlogContent content={post.content.rendered} />

      <div className="mt-12 pt-6 border-t border-gray-200">
        <a 
          href="/blog" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to all posts
        </a>
      </div>

      {/* Related Posts */}
      <div className="mt-8">
        <RelatedPosts posts={relatedPosts} />
      </div>
        </article>

        <aside className="w-full lg:w-1/4 xl:w-1/5">
          <TableOfContents />
        </aside>
      </div>
    </div>
  );
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  try {
    const posts = await getPosts({ perPage: 100 });
    return posts.map((post: Post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error during static generation of blog posts:', error);
    return [];
  }
}
