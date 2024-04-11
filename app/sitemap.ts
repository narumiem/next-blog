import { BLOG_PATH } from '@/app/_const/site-config';
import { siteMeta } from '@/app/_const/site-meta';
import { getAllCategories, getAllPages, getAllPosts, getAllTags } from '@/app/_lib/apollo-client';

interface Sitemap {
  url: string;
  lastModified: Date;
}

async function sitemap(): Promise<Sitemap[]> {
  // Extract siteUrl from site metadata
  const { siteUrl } = siteMeta;

  // Fetch and transform pages data for sitemap
  const pages = (await getAllPages()) ?? [];
  const pageFields = pages.map((page) => {
    return {
      url: new URL(`/${page.slug}`, siteUrl).toString(), // Construct URL for each page
      lastModified: new Date(), // Set last modified date
    };
  });

  // Fetch and transform posts data for sitemap
  const posts = (await getAllPosts()) ?? [];
  const postFields = posts.map((post) => {
    return {
      url: new URL(`/${BLOG_PATH}/${post.slug}`, siteUrl).toString(), // Construct URL for each post
      lastModified: new Date(), // Set last modified date
    };
  });

  // Fetch and transform categories data for sitemap
  const categories = (await getAllCategories()) ?? [];
  const categoryFields = categories.map((category) => {
    return {
      url: new URL(`/${BLOG_PATH}/category/${category.slug}`, siteUrl).toString(), // Construct URL for each category
      lastModified: new Date(), // Set last modified date
    };
  });

  // Fetch and transform tags data for sitemap
  const tags = (await getAllTags()) ?? [];
  const tagFields = tags.map((tag) => {
    return {
      url: new URL(`/${BLOG_PATH}/tags/${tag.slug}`, siteUrl).toString(), // Construct URL for each tag
      lastModified: new Date(), // Set last modified date
    };
  });

  // Combine and return all sitemap fields
  return [
    {
      url: new URL(siteUrl).toString(), // Add the site URL as the first entry
      lastModified: new Date(), // Set last modified date for the site URL
    },
    ...pageFields,
    ...postFields,
    ...categoryFields,
    ...tagFields,
  ];
}

export default sitemap;
