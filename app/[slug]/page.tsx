import Contact from '@/app/_components/contact';
import Hero from '@/app/_components/hero';
import PostBody from '@/app/_components/post-body';
import TwoColumn from '@/app/_components/two-column';
import { siteMeta } from '@/app/_const/site-meta';
import { openGraphMetadata, twitterMetadata } from '@/app/_lib/base-metadata';
import { getAllPages, getPageBySlug } from '@/app/_lib/apollo-client';
import { getImageBlurData } from '@/app/_lib/plaiceholder';
import ParseHTML from '@/app/_lib/html-react-parser';
import { Metadata } from 'next';
import { htmlToText } from '@/app/_lib/html-to-text';
import { eyecatchDefault } from '@/app/_const/site-config';
import PostEyecatch from '@/app/_components/post-eyecatch';

interface StaticParams {
  slug: string;
}
interface Param {
  params: {
    slug: string;
  };
}

export async function generateStaticParams(): Promise<StaticParams[]> {
  const allIds = (await getAllPages()) ?? [];
  return allIds.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Param): Promise<Metadata | undefined> {
  const { siteTitle, siteTitlePipe, siteUrl } = siteMeta;
  const page = await getPageBySlug(params.slug);
  if (!page) return undefined;

  const description = htmlToText(page.content || '');
  const ogpTitle = `${page.title} ${siteTitlePipe} ${siteTitle}`;
  const ogpUrl = new URL(page.slug, siteUrl).toString();
  const eyecatch = page.featuredImage?.node ?? eyecatchDefault;
  const ogpImage = new URL(eyecatch.mediaItemUrl, siteUrl).toString();

  const metadata = {
    title: page.title,
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
          width: eyecatch.mediaDetails.width,
          height: eyecatch.mediaDetails.height,
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

async function Page({ params }: Param): Promise<React.ReactElement> {
  const page = await getPageBySlug(params.slug);
  if (!page) return <p>ページ「{params.slug}」が存在しません。</p>;

  const isEyecatch = Boolean(page.featuredImage);
  const eyecatch = page.featuredImage?.node ?? eyecatchDefault;
  const blurDataURL = await getImageBlurData(eyecatch.mediaItemUrl);

  return (
    <>
      <Hero title={page.title} />
      {isEyecatch && (
        <PostEyecatch
          src={eyecatch.mediaItemUrl}
          alt={eyecatch.altText}
          priority
          blurDataURL={blurDataURL}
        />
      )}

      <TwoColumn>
        <TwoColumn.Main>
          <PostBody>
            <ParseHTML contentHTML={page.content} />
          </PostBody>
        </TwoColumn.Main>

        <TwoColumn.Sidebar>
          <Contact />
        </TwoColumn.Sidebar>
      </TwoColumn>
    </>
  );
}
export default Page;
