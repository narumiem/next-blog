import Hero from '@/app/_components/hero';
import Pager from '@/app/_components/pager';
import Posts from '@/app/_components/posts';
import { BLOG_PATH } from '@/app/_const/site-config';
import { siteMeta } from '@/app/_const/site-meta';
import { getAllPosts } from '@/app/_lib/apollo-client';
import { openGraphMetadata, twitterMetadata } from '@/app/_lib/base-metadata';
import { setBlurDataURLForPosts } from '@/app/_lib/plaiceholder';
import { Metadata } from 'next';

const postsPerPage = 6; // Number of posts per page

interface StaticParams {
  number: string; // Page number
}
interface Param {
  params: {
    number: string; // Dynamic parameter for page number
  };
}

export const dynamicParams = false; // Indicates static generation does not use dynamic params

// Generates static parameters for pagination
export async function generateStaticParams(): Promise<StaticParams[] | undefined> {
  const posts = await getAllPosts(); // Fetch all posts
  if (!posts) return undefined; // Return undefined if no posts found
  const totalPages = Math.ceil(posts.length / postsPerPage); // Calculate total pages
  const generatePages = [];
  for (let i = 0; i < totalPages; i++) {
    generatePages.push(i + 1); // Generate page numbers
  }

  return generatePages.map((page) => ({
    number: page.toString(), // Convert page number to string
  }));
}

// Generates metadata for each page
export async function generateMetadata({ params }: Param): Promise<Metadata | undefined> {
  const { siteTitle, siteTitlePipe, siteUrl } = siteMeta; // Site metadata
  const pathName = `/${BLOG_PATH}/page/${params.number}`; // Path for the current page
  const pageDesc = `Page ${params.number} of blog posts.`; // Description for the current page
  const title = `Blog Posts - Page ${params.number}`; // Title for the current page
  const ogpTitle = `${title} ${siteTitlePipe} ${siteTitle}`; // OGP title
  const ogpUrl = new URL(pathName, siteUrl).toString(); // Full OGP URL

  // Combined metadata object
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

// Main Blog component
async function Blog({ params }: Param): Promise<React.ReactElement> {
  const number = parseInt(params.number); // Parse page number from params
  if (isNaN(number) || number <= 0) return <p>Invalid page number.</p>; // Validate page number
  const allPosts = await getAllPosts(); // Fetch all posts
  if (!allPosts || allPosts.length === 0) return <p>No posts found.</p>; // Check if posts exist
  const totalPages = Math.ceil(allPosts.length / postsPerPage); // Calculate total pages
  const startIndex = (number - 1) * postsPerPage; // Calculate start index for posts
  const posts = allPosts.slice(startIndex, startIndex + postsPerPage); // Slice posts for current page
  const updatedPosts = await setBlurDataURLForPosts(posts); // Update posts with blur data URLs

  // Render posts page
  return (
    <>
      <Hero title="blog" subtitle="recent posts" /> {/* Display hero with title and subtitle */}
      <Posts posts={updatedPosts} /> {/* Render posts */}
      <Pager current={number} total={totalPages} /> {/* Pagination component */}
    </>
  );
}

export default Blog;
