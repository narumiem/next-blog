import Container from '@/app/_components/container';
import Hero from '@/app/_components/hero';
import { eyecatchLocal, siteMeta } from '@/app/_lib/constants';
import { openGraphMetadata, twitterMetadata } from '@/app/_lib/baseMetadata';
import { getAllPosts } from '@/app/_lib/microcms';
import Posts from '@/app/_components/posts';
import { getImageBlurData } from '@/app/_lib/plaiceholder';

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

export default async function Blog() {
  const posts = await getAllPosts();

  for (const post of posts) {
    if (!post.hasOwnProperty('eyecatch')) {
      post.eyecatch = eyecatchLocal;
    }
    post.eyecatch.blurDataURL = await getImageBlurData(post.eyecatch.url);
  }

  return (
    <Container>
      <Hero title="blog" subtitle="recent posts" />
      <Posts posts={posts} />
    </Container>
  );
}
