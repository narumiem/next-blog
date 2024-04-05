import { siteMeta } from '@/app/_const/site-meta';
import { getAllCategories, getAllSlugs } from '@/app/_lib/apollo-client';

const { siteUrl } = siteMeta;

interface Sitemap {
  url: string;
  lastModified: Date;
}

async function sitemap(): Promise<Sitemap[]> {
  const posts = (await getAllSlugs()) ?? [];
  const postFields = posts.map((post) => {
    return {
      url: new URL(`/blog/${post.slug}`, siteUrl).toString(),
      lastModified: new Date(),
    };
  });

  const categories = (await getAllCategories()) ?? [];
  const categoryFields = categories.map((category) => {
    return {
      url: new URL(`/blog/category/${category.slug}`, siteUrl).toString(),
      lastModified: new Date(),
    };
  });

  return [
    {
      url: new URL(siteUrl).toString(),
      lastModified: new Date(),
    },
    {
      url: new URL('/about', siteUrl).toString(),
      lastModified: new Date(),
    },
    ...postFields,
    ...categoryFields,
  ];
}

export default sitemap;
