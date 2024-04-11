import PostHeader from '@/app/_components/post-header';
import Posts from '@/app/_components/posts';
import { siteMeta } from '@/app/_const/site-meta';
import { setBlurDataURLForPosts } from '@/app/_lib/plaiceholder';
import { openGraphMetadata, twitterMetadata } from '@/app/_lib/base-metadata';
import type { Metadata } from 'next';
import {
  getAllCategories,
  getAllPostsByCategory,
  getCategoryBySlug,
} from '@/app/_lib/apollo-client';

interface StaticParams {
  slug: string; // Slug of the category
}
interface Param {
  params: {
    slug: string; // Dynamic parameter for category slug
  };
}

export const dynamicParams = false; // Indicates static generation does not use dynamic params

// Generates static parameters for category pages
export async function generateStaticParams(): Promise<StaticParams[] | undefined> {
  const allCategories = (await getAllCategories()) ?? []; // Fetch all categories
  return allCategories.map(({ slug }) => ({ slug })); // Return slugs for static paths
}

// Generates metadata for each category page
export async function generateMetadata({ params }: Param): Promise<Metadata | undefined> {
  const { siteTitle, siteTitlePipe, siteUrl } = siteMeta; // Site metadata
  const category = await getCategoryBySlug(params.slug); // Fetch category by slug
  if (!category) return undefined; // Return undefined if category does not exist
  const pathName = `/category/${params.slug}`; // Path for the current category
  const pageDesc = `Articles related to ${category.name}`; // Description for the current category page
  const ogpTitle = `${category.name} ${siteTitlePipe} ${siteTitle}`; // OGP title
  const ogpUrl = new URL(pathName, siteUrl).toString(); // Full OGP URL

  // Combined metadata object
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

// Main Category component
async function Category({ params }: Param): Promise<React.ReactElement> {
  const category = await getCategoryBySlug(params.slug); // Fetch category by slug
  if (!category) return <p>Category not found.</p>; // Display message if category does not exist
  const posts = await getAllPostsByCategory(category.slug); // Fetch posts by category slug
  if (!posts || posts.length === 0)
    return <p>No posts found for category &apos;{category.name}&apos;.</p>; // Display message if no posts found
  const updatedPosts = await setBlurDataURLForPosts(posts); // Update posts with blur data URLs

  // Render category page
  return (
    <>
      <PostHeader title={category.name} subtitle="Blog Category" /> {/* Display the category name in the header */}
      <Posts posts={updatedPosts} /> {/* Render the posts */}
    </>
  );
}

export default Category;
