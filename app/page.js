import Container from '@/app/_components/container';
import Hero from '@/app/_components/hero';
import Pagination from '@/app/_components/pagination';
import Posts from '@/app/_components/posts';
import { eyecatchLocal } from '@/app/_lib/constants';
import { getAllPosts } from '@/app/_lib/microcms';
import { getImageBlurData } from '@/app/_lib/plaiceholder';

export default async function Home() {
  const posts = await getAllPosts(4);
  for (const post of posts) {
    if (!post.hasOwnProperty('eyecatch')) {
      post.eyecatch = eyecatchLocal;
    }
    post.eyecatch.blurDataURL = await getImageBlurData(post.eyecatch.url);
  }

  return (
    <Container>
      <Hero title="CUBE" subtitle="アウトプットしていくサイト" imageOn />
      <Posts posts={posts} />
      <Pagination nextUrl="/blog/page/1" nextText="More Posts" />
    </Container>
  );
}
