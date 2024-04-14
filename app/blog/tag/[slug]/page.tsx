import PostHeader from '@/app/_components/post-header';
import Posts from '@/app/_components/posts';
import { setBlurDataURLForPosts } from '@/app/_lib/plaiceholder';
import { openGraphMetadata, siteMetadata, twitterMetadata } from '@/app/_lib/metadata';
import type { Metadata } from 'next';
import { getAllPostsByTag, getAllTags, getTagBySlug } from '@/app/_lib/apollo-client';

// Define the shape of the static parameters for the dynamic route
interface StaticParams {
  slug: string;
}

// Define the shape of the parameters for the dynamic route
interface Param {
  params: {
    slug: string;
  };
}

// Indicates that the dynamic route does not have any parameters
export const dynamicParams = false;

/**
 * Generates the static parameters for the dynamic route.
 * @returns An array of static parameters or undefined if there are no tags.
 */
export async function generateStaticParams(): Promise<StaticParams[] | undefined> {
  const allTags = (await getAllTags()) ?? [];
  return allTags.map(({ slug }) => ({ slug }));
}

/**
 * Generates the metadata for the dynamic route.
 * @param params - The parameters for the dynamic route.
 * @returns The metadata object or undefined if the tag is not found.
 */
export async function generateMetadata({ params }: Param): Promise<Metadata | undefined> {
  const { siteTitle, siteTitlePipe, siteUrl } = siteMetadata;
  const tag = await getTagBySlug(params.slug);
  if (!tag) return undefined;
  const pathName = `/tag/${params.slug}`;
  const pageDesc = `Articles related to ${tag.name}`;
  const ogpTitle = `${tag.name} ${siteTitlePipe} ${siteTitle}`;
  const ogpUrl = new URL(pathName, siteUrl).toString();

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

/**
 * Renders the Tag page for the dynamic route.
 * @param params - The parameters for the dynamic route.
 * @returns The rendered Tag page.
 */
async function Tag({ params }: Param): Promise<React.ReactElement> {
  const tag = await getTagBySlug(params.slug);
  if (!tag) return <p>Tag not found.</p>;
  const posts = await getAllPostsByTag(tag.slug);
  if (!posts || posts.length === 0) return <p>No posts found for tag &apos;{tag.name}&apos;.</p>;
  const updatedPosts = await setBlurDataURLForPosts(posts);

  return (
    <>
      <PostHeader title={tag.name} subtitle="Blog Tag" />
      <Posts posts={updatedPosts} />
    </>
  );
}

export default Tag;
