import Container from '@/app/_components/container';
import Hero from '@/app/_components/hero';
import Pager from '@/app/_components/pager';
import Posts from '@/app/_components/posts';
import { getAllPosts } from '@/app/_lib/microcms';
import { setBlurDataURLForPosts } from '@/app/_lib/plaiceholder';

export const dynamicParams = false;
const postsPerPage = 4;

interface StaticParams {
  number: string;
}
interface Param {
  params: {
    number: string;
  };
}

export async function generateStaticParams(): Promise<StaticParams[] | undefined> {
  const posts = await getAllPosts();
  if (!posts) return undefined;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const generatePages = [];
  for (let i = 0; i < totalPages; i++) {
    generatePages.push(i + 1);
  }

  return generatePages.map((page) => ({
    number: page.toString(),
  }));
}

async function Blog({ params }: Param): Promise<React.ReactElement> {
  const number = parseInt(params.number);
  if (isNaN(number) || number <= 0) return <p>Invalid page number.</p>;
  const allPosts = await getAllPosts();
  if (!allPosts) return <p>No Posts.</p>;
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (number - 1) * postsPerPage;
  const posts = allPosts.slice(startIndex, startIndex + postsPerPage);
  const updatedPosts = await setBlurDataURLForPosts(posts);

  return (
    <Container>
      <Hero title="blog" subtitle="recent posts with pager" />
      <Posts posts={updatedPosts} />
      <Pager current={number} total={totalPages} />
    </Container>
  );
}

export default Blog;
