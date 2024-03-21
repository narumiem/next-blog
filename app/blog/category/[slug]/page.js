import Container from '@/app/_components/container';
import PostHeader from '@/app/_components/post-header';
import Posts from '@/app/_components/posts';
import { eyecatchLocal } from '@/app/_lib/constants';
import {
  getAllCategories,
  getAllPostsByCategory,
  getCategorytBySlug,
} from '@/app/_lib/microcms';
import { getImageBlurData } from '@/app/_lib/plaiceholder';
import { siteMeta } from '@/app/_lib/constants';
import { openGraphMetadata, twitterMetadata } from '@/app/_lib/baseMetadata';

const { siteTitle, siteTitlePipe, siteUrl } = siteMeta;

export const dynamicParams = false;

export async function generateStaticParams() {
  const allCategories = await getAllCategories();
  return allCategories.map(({ slug }) => {
    return { slug: slug };
  });
}

export async function generateMetadata({ params }) {
  const categorySlug = params.slug;
  const category = await getCategorytBySlug(categorySlug);
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

export default async function Category({ params }) {
  const categorySlug = params.slug;
  const category = await getCategorytBySlug(categorySlug);
  const posts = await getAllPostsByCategory(category.id);

  for (const post of posts) {
    if (!post.hasOwnProperty('eyecatch')) {
      post.eyecatch = eyecatchLocal;
    }
    post.eyecatch.blurDataURL = await getImageBlurData(post.eyecatch.url);
  }

  return (
    <Container>
      <PostHeader title={category.name} subtitle="Blog Category" />
      <Posts posts={posts} />
    </Container>
  );
}
