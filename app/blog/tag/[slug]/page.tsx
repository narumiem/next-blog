import Container from '@/app/_components/container';
import PostHeader from '@/app/_components/post-header';
import Posts from '@/app/_components/posts';
import { siteMeta } from '@/app/_const/site-meta';
import { setBlurDataURLForPosts } from '@/app/_lib/plaiceholder';
import { openGraphMetadata, twitterMetadata } from '@/app/_lib/base-metadata';
import type { Metadata } from 'next';
import {
  getAllPostsByTag,
  getAllTags,
  getTagBySlug,
} from '@/app/_lib/apollo-client';

const { siteTitle, siteTitlePipe, siteUrl } = siteMeta;
export const dynamicParams = false;

interface StaticParams {
  slug: string;
}
interface Param {
  params: {
    slug: string;
  };
}

export async function generateStaticParams(): Promise<StaticParams[] | undefined> {
  const allTags = (await getAllTags()) ?? [];
  return allTags.map(({ slug }) => {
    return { slug: slug };
  });
}

export async function generateMetadata({ params }: Param): Promise<Metadata | undefined> {
  const tagSlug = params.slug;
  const tag = await getTagBySlug(tagSlug);
  if (!tag) return undefined;
  const pageTitle = tag.name;
  const pathName = `/tag/${tagSlug}`;
  const pageDesc = `${pageTitle}に関する記事`;
  const ogpTitle = `${pageTitle} ${siteTitlePipe} ${siteTitle}`;
  const ogpUrl = new URL(pathName, siteUrl).toString();

  const metadata = {
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
  return metadata;
}

async function Tag({ params }: Param): Promise<React.ReactElement> {
  const tagSlug = params.slug;
  const tag = await getTagBySlug(tagSlug);
  if (!tag) return <p>タグが存在しません。</p>;
  const posts = await getAllPostsByTag(tag.slug);
  if (!posts || posts.length === 0) return <p>タグ「{tag.name}」には記事がありません。</p>;
  const updatedPosts = await setBlurDataURLForPosts(posts);

  return (
    <Container>
      <PostHeader title={tag.name} subtitle="Blog Tag" />
      <Posts posts={updatedPosts} />
    </Container>
  );
}

export default Tag;