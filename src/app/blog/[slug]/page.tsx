import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { getPostBySlug, getPosts, getRelatedPosts, Post } from '@/lib/wordpress';

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

import dynamic from 'next/dynamic';
import RelatedPosts from '@/components/RelatedPosts';

// Dynamically import the TableOfContents component with no SSR
const TableOfContents = dynamic(
  () => import('@/components/TableOfContents'),
  { ssr: false }
);

export default async function BlogPost({ params }: Params) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const author = post._embedded?.author?.[0];
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
  
  console.log('Post categories:', post.categories);
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

        {featuredImage?.source_url && (
          <div className="mb-8 rounded-lg overflow-hidden relative w-full h-[500px]">
            <Image
              src={featuredImage.source_url}
              alt={featuredImage.alt_text || post.title.rendered}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
            />
          </div>
        )}
      </header>

      <div className="prose max-w-none prose-lg">
        <div
          dangerouslySetInnerHTML={{
            __html: post.content.rendered
              // Replace img tags with a marker for processing
              .replace(/<img([^>]*)>/g, (match) => `[IMAGE:${btoa(match)}]`)
              // Add IDs to all headings for the table of contents
              .replace(/<h([2-4])>(.*?)<\/h[2-4]>/g, (match, level, content) => {
                const id = content
                  .toLowerCase()
                  .replace(/[^\w\s-]/g, '')
                  .replace(/\s+/g, '-');
                return `<h${level} id="${id}">${content}</h${level}>`;
              })
          }}
        />
        
        {/* Process images with Next.js Image component */}
        {post.content.rendered.match(/<img[^>]*>/g)?.map((imgTag, index) => {
          try {
            const srcMatch = imgTag.match(/src=["'](.*?)["']/);
            const altMatch = imgTag.match(/alt=["'](.*?)["']/);
            const widthMatch = imgTag.match(/width=["'](\d+)["']/);
            const heightMatch = imgTag.match(/height=["'](\d+)["']/);
            
            if (!srcMatch) return null;
            
            const src = srcMatch[1];
            const alt = altMatch?.[1] || '';
            const width = widthMatch ? parseInt(widthMatch[1]) : 800;
            const height = heightMatch ? parseInt(heightMatch[1]) : 450;
            
            return (
              <div key={index} className="my-6 rounded-lg overflow-hidden">
                <Image
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </div>
            );
          } catch (error) {
            console.error('Error processing image:', error);
            return null;
          }
        })}
      </div>

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
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
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
