import Container from '@/app/_components/container';
import Hero from '@/app/_components/hero';
import PostEyecatch from '@/app/_components/post-eyecatch';
import { eyecatch404 } from '@/app/_const/site-config';

function NotFoundBoundary(): React.ReactElement {
  return (
    <>
      <title>404: ページが見つかりません</title>
      <Container>
        <Hero title="404" subtitle="お探しのページは見つかりませんでした。" />
        <PostEyecatch
          src={eyecatch404.mediaItemUrl}
          alt={eyecatch404.altText}
          priority
          blurDataURL={eyecatch404.blurDataURL}
        />
      </Container>
    </>
  );
}

export default NotFoundBoundary;
