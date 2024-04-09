import Hero from '@/app/_components/hero';
import Pagination from '@/app/_components/pagination';
import Posts from '@/app/_components/posts';
import { blogPath, siteConfig } from '@/app/_const/site-config';
import { getAllPosts } from '@/app/_lib/apollo-client';
import { setBlurDataURLForPosts } from '@/app/_lib/plaiceholder';

async function Home(): Promise<React.ReactElement> {
  const { siteTitle, siteDescription } = siteConfig;
  const posts = await getAllPosts(4);
  if (!posts) return <p>No posts.</p>;
  const updatedPosts = await setBlurDataURLForPosts(posts);

  return (
    <>
      <Hero title={siteTitle} subtitle={siteDescription} imageOn />
      <Posts posts={updatedPosts} />
      <Pagination nextUrl={`/${blogPath}/page/1`} nextText="More Posts" />
    </>
  );
}

export default Home;
