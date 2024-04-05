import type { Post } from '@/app/_lib/apollo-client';


interface Slug {
  id: string;
  slug: string;
  title: string;
}
export function prevNextPost(
  allSlugs: Post[],
  currentSlug: string
): [Slug, Slug] {
  const numberOfPosts = allSlugs.length;
  const index = allSlugs.findIndex(({ slug }) => slug === currentSlug);
  const prevPost =
    index + 1 === numberOfPosts
      ? { id: '', slug: '', title: '' }
      : allSlugs[index + 1];
  const nextPost =
    index === 0 ? { id: '', slug: '', title: '' } : allSlugs[index - 1];

  return [prevPost, nextPost];
}
