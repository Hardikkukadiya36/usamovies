import { Metadata } from 'next';
import BlogGrid from '@/components/BlogGrid';
import { getPosts } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Blog - Latest Articles',
  description: 'Read our latest blog posts and articles',
};

export default async function BlogPage() {
  const posts = await getPosts({ perPage: 10 });

  return (
    <main>
      <BlogGrid 
        posts={posts} 
        title="Latest Blog Posts"
        maxPosts={12}
        showViewAll={false}
      />
    </main>
  );
}
