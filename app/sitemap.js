import { getAllCategories, getAllSlugs } from '@/app/_lib/microcms';
import { siteMeta } from '@/app/_lib/constants';
const { siteUrl } = siteMeta;

export default async function sitemap() {
  const posts = await getAllSlugs();
  const postFields = posts.map((post) => {
    return {
      url: new URL(`/blog/${post.slug}`, siteUrl).toString(),
      lastModified: new Date(),
    };
  });

  const categories = await getAllCategories();
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
