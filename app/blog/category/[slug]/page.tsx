import PostHeader from '@/app/_components/post-header';
import Posts from '@/app/_components/posts';
import { setBlurDataURLForPosts } from '@/app/_lib/plaiceholder';
import { openGraphMetadata, siteMetadata, twitterMetadata } from '@/app/_lib/metadata';
import type { Metadata } from 'next';
import {
  getAllCategories,
  getAllPostsByCategory,
  getCategoryBySlug,
} from '@/app/_lib/apollo-client';

// Define the shape of the static parameters
interface StaticParams {
  slug: string;
}

// Define the shape of the parameter object
interface Param {
  params: {
    slug: string;
  };
}

// Indicate that dynamic parameters are not supported
export const dynamicParams = false;

/**
 * Generate the static parameters for the page.
 * @returns An array of static parameters or undefined.
 */
export async function generateStaticParams(): Promise<StaticParams[] | undefined> {
  const allCategories = (await getAllCategories()) ?? [];
  return allCategories.map(({ slug }) => ({ slug }));
}

/**
 * Generate the metadata for the page.
 * @param params - The parameter object.
 * @returns The metadata object or undefined.
 */
export async function generateMetadata({ params }: Param): Promise<Metadata | undefined> {
  const { siteTitle, siteTitlePipe, siteUrl } = siteMetadata;
  const category = await getCategoryBySlug(params.slug);
  if (!category) return undefined;
  const pathName = `/category/${params.slug}`;
  const pageDesc = `Articles related to ${category.name}`;
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

/**
 * Render the Category page.
 * @param params - The parameter object.
 * @returns The rendered Category page.
 */
async function Category({ params }: Param): Promise<React.ReactElement> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return <p>Category not found.</p>;
  const posts = await getAllPostsByCategory(category.slug);
  if (!posts || posts.length === 0)
    return <p>No posts found for category &apos;{category.name}&apos;.</p>;
  const updatedPosts = await setBlurDataURLForPosts(posts);

  return (
    <>
      <PostHeader title={category.name} subtitle="Blog Category" />
      <Posts posts={updatedPosts} />
    </>
  );
}

export default Category;
