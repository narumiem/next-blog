import Hero from '@/app/_components/hero';
import Pagination from '@/app/_components/pagination';
import Posts from '@/app/_components/posts';
import { BLOG_PATH, siteConfig } from '@/app/_const/site-config';
import { getAllPosts } from '@/app/_lib/apollo-client';
import { setBlurDataURLForPosts } from '@/app/_lib/plaiceholder';

async function Home(): Promise<React.ReactElement> {
  // Extract site title and description from site configuration
  const { siteTitle, siteDescription } = siteConfig;

  // Fetch the latest 4 posts
  const posts = await getAllPosts(4);
  if (!posts) return <p>No posts.</p>; // Return a message if no posts are found

  // Update posts with blur data URLs for image placeholders
  const updatedPosts = await setBlurDataURLForPosts(posts);

  // Render components with updated posts and site information
  return (
    <>
      <Hero title={siteTitle} subtitle={siteDescription} imageOn />
      {/* Display hero with site title and subtitle */}
      <Posts posts={updatedPosts} /> {/* Render the posts */}
      <Pagination nextUrl={`/${BLOG_PATH}/page/1`} nextText="More Posts" />
      {/* Pagination component */}
    </>
  );
}

export default Home;
