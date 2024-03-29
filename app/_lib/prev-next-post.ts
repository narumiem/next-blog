interface Slug {
  id: string;
  title: string;
  slug: string;
}

export function prevNextPost(
  allSlugs: Slug[],
  currentSlug: string
): [Slug, Slug] {
  const numberOfPosts = allSlugs.length;
  const index = allSlugs.findIndex(({ slug }) => slug === currentSlug);
  const prevPost =
    index + 1 === numberOfPosts
      ? { id: '', title: '', slug: '' }
      : allSlugs[index + 1];
  const nextPost =
    index === 0 ? { id: '', title: '', slug: '' } : allSlugs[index - 1];

  return [prevPost, nextPost];
}
