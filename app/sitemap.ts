import { BLOG_PATH } from '@/app/_const/site-config';
import { getAllCategories, getAllPages, getAllPosts, getAllTags } from '@/app/_lib/apollo-client';
import { siteMetadata } from '@/app/_lib/metadata';

// Interface for the sitemap entry
interface SitemapEntry {
  url: string; // The URL of the entry
  lastModified: Date; // The last modified date of the entry
}

/**
 * Generates the sitemap for the website.
 * @returns An array of sitemap entries.
 */
async function sitemap(): Promise<SitemapEntry[]> {
  const { siteUrl } = siteMetadata;

  // Get all pages and map them to sitemap entries
  const pages = (await getAllPages()) ?? [];
  const pageFields = pages.map((page) => {
    return {
      url: new URL(`/${page.slug}`, siteUrl).toString(),
      lastModified: new Date(),
    };
  });

  // Get all posts and map them to sitemap entries
  const posts = (await getAllPosts()) ?? [];
  const postFields = posts.map((post) => {
    return {
      url: new URL(`/${BLOG_PATH}/${post.slug}`, siteUrl).toString(),
      lastModified: new Date(),
    };
  });

  // Get all categories and map them to sitemap entries
  const categories = (await getAllCategories()) ?? [];
  const categoryFields = categories.map((category) => {
    return {
      url: new URL(`/${BLOG_PATH}/category/${category.slug}`, siteUrl).toString(),
      lastModified: new Date(),
    };
  });

  // Get all tags and map them to sitemap entries
  const tags = (await getAllTags()) ?? [];
  const tagFields = tags.map((tag) => {
    return {
      url: new URL(`/${BLOG_PATH}/tags/${tag.slug}`, siteUrl).toString(),
      lastModified: new Date(),
    };
  });

  // Combine all sitemap entries into a single array
  return [
    {
      url: new URL(siteUrl).toString(),
      lastModified: new Date(),
    },
    ...pageFields,
    ...postFields,
    ...categoryFields,
    ...tagFields,
  ];
}

export default sitemap;
