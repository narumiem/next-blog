import Hero from '@/app/_components/hero';
import Pager from '@/app/_components/pager';
import Posts from '@/app/_components/posts';
import { BLOG_PATH } from '@/app/_const/site-config';
import { getAllPosts } from '@/app/_lib/apollo-client';
import { openGraphMetadata, siteMetadata, twitterMetadata } from '@/app/_lib/metadata';
import { setBlurDataURLForPosts } from '@/app/_lib/plaiceholder';
import { Metadata } from 'next';

const postsPerPage = 6;

// StaticParams interface for the dynamic route parameter
interface StaticParams {
  number: string;
}

// Param interface for the generateMetadata function parameter
interface Param {
  params: {
    number: string;
  };
}

// Flag to indicate if dynamic route parameters are enabled
export const dynamicParams = false;

/**
 * Generates an array of StaticParams based on the total number of posts
 * @returns An array of StaticParams or undefined if no posts are available
 */
export async function generateStaticParams(): Promise<StaticParams[] | undefined> {
  const posts = await getAllPosts();
  if (!posts) return undefined;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const generatePages = [];
  for (let i = 0; i < totalPages; i++) {
    generatePages.push(i + 1);
  }

  return generatePages.map((page) => ({
    number: page.toString(),
  }));
}

/**
 * Generates the metadata for a specific blog posts page
 * @param params - The dynamic route parameters
 * @returns The metadata object or undefined if no posts are available
 */
export async function generateMetadata({ params }: Param): Promise<Metadata | undefined> {
  const { siteTitle, siteTitlePipe, siteUrl } = siteMetadata;
  const pathName = `/${BLOG_PATH}/page/${params.number}`;
  const pageDesc = `Page ${params.number} of blog posts.`;
  const title = `Blog Posts - Page ${params.number}`;
  const ogpTitle = `${title} ${siteTitlePipe} ${siteTitle}`;
  const ogpUrl = new URL(pathName, siteUrl).toString();

  const metadata = {
    title: title,
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
 * Renders the blog posts page with the specified page number
 * @param params - The dynamic route parameters
 * @returns The React element representing the blog posts page
 */
async function Blog({ params }: Param): Promise<React.ReactElement> {
  const number = parseInt(params.number);
  if (isNaN(number) || number <= 0) return <p>Invalid page number.</p>;
  const allPosts = await getAllPosts();
  if (!allPosts || allPosts.length === 0) return <p>No posts found.</p>;
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (number - 1) * postsPerPage;
  const posts = allPosts.slice(startIndex, startIndex + postsPerPage);
  const updatedPosts = await setBlurDataURLForPosts(posts);

  return (
    <>
      <Hero title="blog" subtitle="recent posts" />
      <Posts posts={updatedPosts} />
      <Pager current={number} total={totalPages} />
    </>
  );
}

export default Blog;
