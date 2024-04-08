import Contact from '@/app/_components/contact';
import Container from '@/app/_components/container';
import Hero from '@/app/_components/hero';
import PostBody from '@/app/_components/post-body';
import TwoColumn from '@/app/_components/two-column';
import Image from 'next/image';
import { siteMeta } from '@/app/_const/site-meta';
import { openGraphMetadata, twitterMetadata } from '@/app/_lib/base-metadata';
import { getPageBySlug } from '@/app/_lib/apollo-client';
import { getImageBlurData } from '@/app/_lib/plaiceholder';
import ParseHTML from '@/app/_lib/html-react-parser';

const pageTitle = 'アバウト';
const pageDesc = 'このブログについて';
const pathName = '/about';
const pageImage = {
  src: '/images/about.jpg',
  width: 1920,
  height: 960,
};

const { siteTitle, siteTitlePipe, siteUrl } = siteMeta;
const ogpTitle = `${pageTitle} ${siteTitlePipe} ${siteTitle}`;
const ogpUrl = new URL(pathName, siteUrl).toString();
const ogpImage = new URL(pageImage.src, siteUrl).toString();

export const metadata = {
  title: pageTitle,
  alternates: {
    canonical: ogpUrl,
  },
  description: pageDesc,
  openGraph: {
    ...openGraphMetadata,
    title: ogpTitle,
    description: pageDesc,
    url: ogpUrl,
    images: [
      {
        url: ogpImage,
        width: pageImage.width,
        height: pageImage.height,
      },
    ],
  },
  twitter: {
    ...twitterMetadata,
    title: ogpTitle,
    description: pageDesc,
    images: [ogpImage],
  },
};

async function About(): Promise<React.ReactElement> {
  const page = await getPageBySlug('/about/');
  if (!page) return <p>Page not found.</p>;
  const title = page.title;
  const content = page.content;
  const eyecatchUrl = page.featuredImage.node.mediaItemUrl;
  const eyecatchAltText = page.featuredImage.node.altText;
  const eyecatchWidth = page.featuredImage.node.mediaDetails.width;
  const eyecatchHeight = page.featuredImage.node.mediaDetails.height;
  const blurDataURL = await getImageBlurData(eyecatchUrl);

  return (
    <Container>
      <Hero title={title} />
      <figure>
        <Image
          src={eyecatchUrl}
          width={eyecatchWidth}
          height={eyecatchHeight}
          alt={eyecatchAltText}
          sizes="100vw"
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
          priority
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </figure>

      <TwoColumn>
        <TwoColumn.Main>
          <PostBody>
            <ParseHTML contentHTML={content} />
          </PostBody>
        </TwoColumn.Main>

        <TwoColumn.Sidebar>
          <Contact />
        </TwoColumn.Sidebar>
      </TwoColumn>
    </Container>
  );
}

export default About;
