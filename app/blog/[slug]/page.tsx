import Container from '@/app/_components/container';
import PostBody from '@/app/_components/post-body';
import PostCategories from '@/app/_components/post-categories';
import PostHeader from '@/app/_components/post-header';
import TwoColumn from '@/app/_components/two-column';
import ParseHTML from '@/app/_lib/html-react-parser';
import Image from 'next/image';
import { htmlToText } from '@/app/_lib/html-to-text';
import { siteMeta } from '@/app/_const/site-meta';
import { openGraphMetadata, twitterMetadata } from '@/app/_lib/base-metadata';
import { getImageBlurData } from '@/app/_lib/plaiceholder';
import { prevNextPost } from '@/app/_lib/prev-next-post';
import Pagination from '@/app/_components/pagination';
import type { Metadata } from 'next';
import { eyecatchDefault } from '@/app/_const/site-config';
import { getAllSlugs, getPostBySlug } from '@/app/_lib/apollo-client';
import PostTags from '@/app/_components/post-tags';

const rootPathName = 'blog';
export const dynamicParams = false;

interface StaticParams {
  slug: string;
}
interface Param {
  params: {
    slug: string;
  };
}

export async function generateStaticParams(): Promise<StaticParams[] | undefined> {
  const allslugs = (await getAllSlugs()) ?? [];
  return allslugs.map(({ slug }) => {
    return { slug: slug };
  });
}

export async function generateMetadata({ params }: Param): Promise<Metadata | undefined> {
  const { siteTitle, siteTitlePipe, siteUrl } = siteMeta;
  const slug = params.slug;
  const post = await getPostBySlug(slug);
  if (!post) return undefined;
  const description = htmlToText(post.content ? post.content : '');
  const ogpTitle = `${post.title} ${siteTitlePipe} ${siteTitle}`;
  const pathName = `/${rootPathName}/${slug}`;
  const ogpUrl = new URL(pathName, siteUrl).toString();
  const eyecatch = post.featuredImage?.node ?? eyecatchDefault;
  const ogpImage = new URL(eyecatch.mediaItemUrl, siteUrl).toString();
  const ogpImageWidth = eyecatch.mediaDetails.width;
  const ogpImageHeight = eyecatch.mediaDetails.height;

  const metadata = {
    title: post.title,
    alternates: {
      canonical: ogpUrl,
    },
    description: description,
    openGraph: {
      ...openGraphMetadata,
      title: ogpTitle,
      description: description,
      url: ogpUrl,
      images: [
        {
          url: ogpImage,
          width: ogpImageWidth,
          height: ogpImageHeight,
        },
      ],
    },
    twitter: {
      ...twitterMetadata,
      title: ogpTitle,
      description: description,
      images: [ogpImage],
    },
  };
  return metadata;
}

async function Post({ params }: Param): Promise<React.ReactElement | undefined> {
  const subtitle = 'Blog Article';
  const slug = params.slug;
  const post = await getPostBySlug(slug);
  if (!post) return <p>Post not found.</p>;
  const eyecatch = post.featuredImage?.node ?? eyecatchDefault;
  const blurDataURL = await getImageBlurData(eyecatch.mediaItemUrl);
  const allSlugs = (await getAllSlugs()) ?? [];
  if (!allSlugs) return <p>No posts.</p>;
  const [prevPost, nextPost] = prevNextPost(allSlugs, slug);

  return (
    <Container>
      <article>
        <PostHeader title={post.title} subtitle={subtitle} publishDate={post.dateGmt} />

        <figure>
          <Image
            src={eyecatch.mediaItemUrl}
            alt={eyecatch.altText}
            width={eyecatch.mediaDetails.width}
            height={eyecatch.mediaDetails.height}
            sizes="(min-width: 1152px) 1152px, 100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
            placeholder="blur"
            blurDataURL={blurDataURL}
            priority
          />
        </figure>

        <TwoColumn>
          <TwoColumn.Main>
            <PostBody>
              <ParseHTML contentHTML={post.content ?? ''} />
            </PostBody>
          </TwoColumn.Main>

          <TwoColumn.Sidebar>
            <PostCategories categories={post.categories.nodes ?? []} />
            <PostTags tags={post.tags.nodes ?? []} />
          </TwoColumn.Sidebar>
        </TwoColumn>

        <Pagination
          prevText={prevPost.title}
          prevUrl={`/${rootPathName}/${prevPost.slug}`}
          nextText={nextPost.title}
          nextUrl={`/${rootPathName}/${nextPost.slug}`}
        />
      </article>
    </Container>
  );
}

export default Post;
