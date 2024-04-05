import Container from '@/app/_components/container';
import PostHeader from '@/app/_components/post-header';
import Posts from '@/app/_components/posts';
import { siteMeta } from '@/app/_const/site-meta';
import { setBlurDataURLForPosts } from '@/app/_lib/plaiceholder';
import { openGraphMetadata, twitterMetadata } from '@/app/_lib/base-metadata';
import type { Metadata } from 'next';
import { getAllCategories, getAllPostsByCategory, getCategoryBySlug } from '@/app/_lib/apollo-client';

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
  const allCategories = (await getAllCategories()) ?? [];
  return allCategories.map(({ slug }) => {
    return { slug: slug };
  });
}

export async function generateMetadata({ params }: Param): Promise<Metadata | undefined> {
  const categorySlug = params.slug;
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  const pageTitle = category.name;
  const pathName = `/category/${categorySlug}`;
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

async function Category({ params }: Param): Promise<React.ReactElement> {
  const categorySlug = params.slug;
  const category = await getCategoryBySlug(categorySlug);
  if(!category) return <p>No Category.</p>
  const posts = await getAllPostsByCategory(category.slug);
  if (!posts || posts.length === 0) return <p>カテゴリ「{category.name}」には記事がありません。</p>;
  const updatedPosts = await setBlurDataURLForPosts(posts);

  return (
    <Container>
      <PostHeader title={category.name} subtitle="Blog Category" />
      <Posts posts={updatedPosts} />
    </Container>
  );
}

export default Category;
