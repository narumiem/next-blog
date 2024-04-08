import Container from '@/app/_components/container';
import Hero from '@/app/_components/hero';
import Pager from '@/app/_components/pager';
import Posts from '@/app/_components/posts';
import { blogPath } from '@/app/_const/site-config';
import { siteMeta } from '@/app/_const/site-meta';
import { getAllPosts } from '@/app/_lib/apollo-client';
import { openGraphMetadata, twitterMetadata } from '@/app/_lib/base-metadata';
import { setBlurDataURLForPosts } from '@/app/_lib/plaiceholder';
import { Metadata } from 'next';

const postsPerPage = 4;

interface StaticParams {
  number: string;
}
interface Param {
  params: {
    number: string;
  };
}

export const dynamicParams = false;

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


export async function generateMetadata({ params }: Param): Promise<Metadata | undefined> {
  const { siteTitle, siteTitlePipe, siteUrl } = siteMeta;
  const pathName = `/${blogPath}/page/${params.number}`;
  const pageDesc = `Blog記事一覧の${params.number}ページ目です。`;
  const title = `Blog記事一覧 ${params.number}ページ目`;
  const ogpTitle = `${title} ${siteTitlePipe} ${siteTitle}`;
  const ogpUrl = new URL(pathName, siteUrl).toString();

  const metadata = {
    title: title,
    alternates: {
      canonical: ogpUrl,
    },
    description: pageDesc,
    openGraph: {
      ...openGraphMetadata,
      title: ogpTitle,
      description: pageDesc,
      url: ogpUrl,
    },
    twitter: {
      ...twitterMetadata,
      title: ogpTitle,
      description: pageDesc,
    },
  };

  return metadata;
}

async function Blog({ params }: Param): Promise<React.ReactElement> {
  const number = parseInt(params.number);
  if (isNaN(number) || number <= 0) return <p>無効なページ番号です。</p>;
  const allPosts = await getAllPosts();
  if (!allPosts || allPosts.length === 0) return <p>投稿がありません。</p>;
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
