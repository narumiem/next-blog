import { Slug } from '@/app/_lib/apollo-client';


export function prevNextPost(
  allSlugs: Slug[],
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
