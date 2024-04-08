import Container from '@/app/_components/container';
import Hero from '@/app/_components/hero';
import { eyecatch404 } from '@/app/_const/site-config';
import Image from 'next/image';

function NotFoundBoundary(): React.ReactElement {
  return (
    <>
      <title>404: ページが見つかりません</title>
      <Container>
        <Hero title="404" subtitle="お探しのページは見つかりませんでした。" />
        <figure>
          <Image
            src={eyecatch404.mediaItemUrl}
            width={eyecatch404.mediaDetails.width}
            height={eyecatch404.mediaDetails.height}
            alt={eyecatch404.altText}
            sizes="100vw"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
            priority
            placeholder="blur"
            blurDataURL={eyecatch404.blurDataURL}
          />
        </figure>
      </Container>
    </>
  );
}

export default NotFoundBoundary;
