import PostHeader from '@/app/_components/post-header';
import Posts from '@/app/_components/posts';
import { siteMeta } from '@/app/_const/site-meta';
import { setBlurDataURLForPosts } from '@/app/_lib/plaiceholder';
import { openGraphMetadata, twitterMetadata } from '@/app/_lib/base-metadata';
import type { Metadata } from 'next';
import { getAllCategories, getAllPostsByCategory, getCategoryBySlug } from '@/app/_lib/apollo-client';

interface StaticParams {
  slug: string;
}
interface Param {
  params: {
    slug: string;
  };
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<StaticParams[] | undefined> {
  const allCategories = (await getAllCategories()) ?? [];
  return allCategories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Param): Promise<Metadata | undefined> {
  const { siteTitle, siteTitlePipe, siteUrl } = siteMeta;
  const category = await getCategoryBySlug(params.slug);
  if (!category) return undefined;
  const pathName = `/category/${params.slug}`;
  const pageDesc = `${category.name}に関する記事`;
  const ogpTitle = `${category.name} ${siteTitlePipe} ${siteTitle}`;
  const ogpUrl = new URL(pathName, siteUrl).toString();

  const metadata = {
    title: category.name,
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
  const category = await getCategoryBySlug(params.slug);
  if(!category) return <p>カテゴリが存在しません。</p>
  const posts = await getAllPostsByCategory(category.slug);
  if (!posts || posts.length === 0) return <p>カテゴリ「{category.name}」には記事がありません。</p>;
  const updatedPosts = await setBlurDataURLForPosts(posts);

  return (
    <>
      <PostHeader title={category.name} subtitle="Blog カテゴリー" />
      <Posts posts={updatedPosts} />
    </>
  );
}

export default Category;
