import Container from '@/app/_components/container';
import Hero from '@/app/_components/hero';
import PostEyecatch from '@/app/_components/post-eyecatch';
import { eyecatch404 } from '@/app/_const/site-config';

/**
 * Renders the 404 page when a requested page is not found.
 * @returns The React element representing the 404 page.
 */
function NotFoundBoundary(): React.ReactElement {
  const title = '404' // Set the title for the hero section
  const subtitle = 'The requested page is missing.' // Set the subtitle for the hero section

  return (
    <>
      {/* Set the title of the page */}
      <title>404: Page not found</title>
      <Container>
        {/* Display the hero section with the title and subtitle */}
        <Hero title={title} subtitle={subtitle} />
        <PostEyecatch
          // Set the source URL and alt text for the eyecatch image
          src={eyecatch404.mediaItemUrl}
          alt={eyecatch404.altText}
          priority
          // Set the blur data URL for the eyecatch image
          blurDataURL={eyecatch404.blurDataURL}
        />
      </Container>
    </>
  );
}

export default NotFoundBoundary;
