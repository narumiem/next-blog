import Container from '@/app/_components/container';
import PostBody from '@/app/_components/post-body';
import PostCategories from '@/app/_components/post-categories';
import PostHeader from '@/app/_components/post-header';
import TwoColumn from '@/app/_components/two-column';
import ParseHTML from '@/app/_lib/html-react-parser';
import { getAllSlugs, getPostBySlug } from '@/app/_lib/microcms';
import Image from 'next/image';
import { htmlToText } from '@/app/_lib/html-to-text';
import { eyecatchLocal, siteMeta } from '@/app/_lib/constants';
import { openGraphMetadata, twitterMetadata } from '@/app/_lib/baseMetadata';
import { getImageBlurData } from '@/app/_lib/plaiceholder';
import { prevNextPost } from '@/app/_lib/prev-next-post';
import Pagination from '@/app/_components/pagination';

const rootPathName = 'blog';

export const dynamicParams = false;

export async function generateStaticParams() {
  const allslugs = await getAllSlugs();
  return allslugs.map(({ slug }) => {
    return { slug: slug };
  });
}

export async function generateMetadata({ params }) {
  const { siteTitle, siteTitlePipe, siteUrl } = siteMeta;
  const slug = params.slug;
  const post = await getPostBySlug(slug);

  const description = htmlToText(post.content);
  const ogpTitle = `${post.title} ${siteTitlePipe} ${siteTitle}`;
  const pathName = `/${rootPathName}/${slug}`;
  const ogpUrl = new URL(pathName, siteUrl).toString();
  const eyecatch = post.eyecatch ?? eyecatchLocal;
  const ogpImage = new URL(eyecatch.url, siteUrl).toString();
  const ogpImageWidth = eyecatch.width;
  const ogpImageHeight = eyecatch.height;

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

export default async function Post({ params }) {
  const subtitle = 'Blog Article';

  const slug = params.slug;
  const post = await getPostBySlug(slug);
  const eyecatch = post.eyecatch ?? eyecatchLocal;
  const blurDataURL = await getImageBlurData(eyecatch.url);
  const allSlugs = await getAllSlugs();
  const [prevPost, nextPost] = prevNextPost(allSlugs, slug);

  return (
    <Container>
      <article>
        <PostHeader
          title={post.title}
          subtitle={subtitle}
          publishDate={post.publishDate}
        />

        <figure>
          <Image
            key={eyecatch.url}
            src={eyecatch.url}
            alt=""
            width={eyecatch.width}
            height={eyecatch.height}
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
              <ParseHTML contentHTML={post.content} />
            </PostBody>
          </TwoColumn.Main>

          <TwoColumn.Sidebar>
            <PostCategories categories={post.categories} />
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
