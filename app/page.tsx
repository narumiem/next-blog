import Hero from '@/app/_components/hero';
import Pagination from '@/app/_components/pagination';
import Posts from '@/app/_components/posts';
import { BLOG_PATH } from '@/app/_const/site-config';
import { getAllPosts } from '@/app/_lib/apollo-client';
import { siteMetadata } from '@/app/_lib/metadata';
import { setBlurDataURLForPosts } from '@/app/_lib/plaiceholder';

/**
 * Renders the home page.
 * @returns A Promise that resolves to a React element.
 */
async function Home(): Promise<React.ReactElement> {
  // Get the site title and description from the metadata
  const { siteTitle, siteDesc } = siteMetadata;

  // Fetch the latest 4 posts
  const posts = await getAllPosts(4);

  // If there are no posts, display a message
  if (!posts) return <p>No posts.</p>;

  // Set blur data URL for the posts' images
  const updatedPosts = await setBlurDataURLForPosts(posts);

  return (
    <>
      {/* Render the hero section with the site title, description, and image */}
      <Hero title={siteTitle} subtitle={siteDesc} imageOn />

      {/* Render the list of posts */}
      <Posts posts={updatedPosts} />

      {/* Render the pagination component with the next URL and text */}
      <Pagination nextUrl={`/${BLOG_PATH}/page/1`} nextText="More Posts" />
    </>
  );
}

export default Home;
