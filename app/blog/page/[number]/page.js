import Container from '@/app/_components/container';
import Hero from '@/app/_components/hero';
import Pager from '@/app/_components/pager';
import Posts from '@/app/_components/posts';
import { eyecatchLocal } from '@/app/_lib/constants';
import { getAllPosts } from '@/app/_lib/microcms';
import { getImageBlurData } from '@/app/_lib/plaiceholder';

export const dynamicParams = false;
const postsPerPage = 4;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const generatePages = [];
  for (let i = 0; i < totalPages; i++) {
    generatePages.push(i + 1);
  }

  return generatePages.map((page) => ({
    number: page.toString(),
  }));
}

export default async function Blog({ params }) {
  const allPosts = await getAllPosts();
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (parseInt(params.number) - 1) * postsPerPage;
  const posts = allPosts.slice(startIndex, startIndex + postsPerPage);

  for (const post of posts) {
    if (!post.hasOwnProperty('eyecatch')) {
      post.eyecatch = eyecatchLocal;
    }
    post.eyecatch.blurDataURL = await getImageBlurData(post.eyecatch.url);
  }

  return (
    <Container>
      <Hero title="blog" subtitle="recent posts with pager" />
      <Posts posts={posts} />
      <Pager current={params.number} total={totalPages} />
    </Container>
  );
}
