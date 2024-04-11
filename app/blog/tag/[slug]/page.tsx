import PostHeader from '@/app/_components/post-header';
import Posts from '@/app/_components/posts';
import { siteMeta } from '@/app/_const/site-meta';
import { setBlurDataURLForPosts } from '@/app/_lib/plaiceholder';
import { openGraphMetadata, twitterMetadata } from '@/app/_lib/base-metadata';
import type { Metadata } from 'next';
import { getAllPostsByTag, getAllTags, getTagBySlug } from '@/app/_lib/apollo-client';

interface StaticParams {
  slug: string;
}
interface Param {
  params: {
    slug: string;
  };
}

// Indicate that dynamic params are not used for static generation
export const dynamicParams = false;

// Generate static params for tag pages
export async function generateStaticParams(): Promise<StaticParams[] | undefined> {
  const allTags = (await getAllTags()) ?? []; // Fetch all tags
  return allTags.map(({ slug }) => ({ slug })); // Return slugs for static paths
}

// Generate metadata for tag pages
export async function generateMetadata({ params }: Param): Promise<Metadata | undefined> {
  const { siteTitle, siteTitlePipe, siteUrl } = siteMeta; // Destructure site metadata
  const tag = await getTagBySlug(params.slug); // Fetch tag by slug
  if (!tag) return undefined; // Return undefined if tag does not exist
  const pathName = `/tag/${params.slug}`; // Construct path for the tag page
  const pageDesc = `Articles related to ${tag.name}`; // Page description
  const ogpTitle = `${tag.name} ${siteTitlePipe} ${siteTitle}`; // OGP title
  const ogpUrl = new URL(pathName, siteUrl).toString(); // Full OGP URL

  // Combine and return page metadata
  const metadata = {
    title: tag.name,
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

// Tag component that displays posts for a specific tag
async function Tag({ params }: Param): Promise<React.ReactElement> {
  const tag = await getTagBySlug(params.slug); // Fetch tag by slug
  if (!tag) return <p>Tag not found.</p>; // Display message if tag does not exist
  const posts = await getAllPostsByTag(tag.slug); // Fetch posts by tag slug
  if (!posts || posts.length === 0) return <p>No posts found for tag &apos;{tag.name}&apos;.</p>; // Display message if no posts found
  const updatedPosts = await setBlurDataURLForPosts(posts); // Update posts with blur data URLs

  // Render tag page
  return (
    <>
      <PostHeader title={tag.name} subtitle="Blog Tag" /> {/* Display the tag name in the header */}
      <Posts posts={updatedPosts} /> {/* Render the posts */}
    </>
  );
}

export default Tag;
