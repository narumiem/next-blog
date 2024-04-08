import { blogPath } from '@/app/_const/site-config';
import { siteMeta } from '@/app/_const/site-meta';
import { getAllCategories, getAllPages, getAllPosts, getAllTags } from '@/app/_lib/apollo-client';

interface Sitemap {
  url: string;
  lastModified: Date;
}

async function sitemap(): Promise<Sitemap[]> {
  const { siteUrl } = siteMeta;

  const pages = (await getAllPages()) ?? [];
  const pageFields = pages.map((page) => {
    return {
      url: new URL(`/${page.slug}`, siteUrl).toString(),
      lastModified: new Date(),
    };
  });

  const posts = (await getAllPosts()) ?? [];
  const postFields = posts.map((post) => {
    return {
      url: new URL(`/${blogPath}/${post.slug}`, siteUrl).toString(),
      lastModified: new Date(),
    };
  });

  const categories = (await getAllCategories()) ?? [];
  const categoryFields = categories.map((category) => {
    return {
      url: new URL(`/${blogPath}/category/${category.slug}`, siteUrl).toString(),
      lastModified: new Date(),
    };
  });

  const tags = (await getAllTags()) ?? [];
  const tagFields = tags.map((tag) => {
    return {
      url: new URL(`/${blogPath}/tags/${tag.slug}`, siteUrl).toString(),
      lastModified: new Date(),
    };
  });

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
