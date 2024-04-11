import Container from '@/app/_components/container';
import Hero from '@/app/_components/hero';
import PostEyecatch from '@/app/_components/post-eyecatch';
import { eyecatch404 } from '@/app/_const/site-config';

function NotFoundBoundary(): React.ReactElement {
  return (
    <>
      <title>404: Page not found</title> {/* Set the document title to indicate a 404 error */}
      <Container>
        <Hero title="404" subtitle="The requested page is missing." /> {/* Display a 404 message */}
        <PostEyecatch
          src={eyecatch404.mediaItemUrl}
          alt={eyecatch404.altText}
          priority
          blurDataURL={eyecatch404.blurDataURL}
        />
        {/* 404 page eyecatch image */}
      </Container>
    </>
  );
}

export default NotFoundBoundary;
