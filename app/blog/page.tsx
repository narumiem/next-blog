import Container from '@/app/_components/container';
import Hero from '@/app/_components/hero';
import { siteMeta } from '@/app/_const/site-meta';
import { openGraphMetadata, twitterMetadata } from '@/app/_lib/base-metadata';
import Posts from '@/app/_components/posts';
import { setBlurDataURLForPosts } from '@/app/_lib/plaiceholder';
import { getAllPosts } from '@/app/_lib/apollo-client';

const pageTitle = 'ブログ';
const pageDesc = 'ブログの記事一覧';
const pathName = '/blog';

const { siteTitle, siteTitlePipe, siteUrl } = siteMeta;
const ogpTitle = `${pageTitle} ${siteTitlePipe} ${siteTitle}`;
const ogpUrl = new URL(pathName, siteUrl).toString();

export const metadata = {
  title: pageTitle,
  alternates: {
    canonical: ogpUrl,
  },
  description: pageDesc,
  openGraph: {
    ...openGraphMetadata,
    title: ogpTitle,
    description: pageDesc,
    url: ogpUrl,
  },
  twitter: {
    ...twitterMetadata,
    title: ogpTitle,
    description: pageDesc,
  },
};

async function Blog(): Promise<React.ReactElement> {
  const posts = await getAllPosts();
  if (!posts) return <p>No posts.</p>;
  const updatedPosts = await setBlurDataURLForPosts(posts)

  return (
    <Container>
      <Hero title="blog" subtitle="recent posts" />
      <Posts posts={updatedPosts} />
    </Container>
  );
}

export default Blog;
