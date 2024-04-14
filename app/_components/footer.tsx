import Logo from '@/app/_components/logo';
import styles from '@/app/_components/footer.module.css';
import Container from '@/app/_components/container';
import Social from '@/app/_components/social';

/**
 * Footer Component
 * Renders the footer section of the website.
 *
 * @returns The rendered footer component.
 */
function Footer(): React.ReactElement {
  return (
    <footer className={styles.footer}>
      <Container>
        {/* Flex container for logo and social icons */}
        <div className={styles.flexContainer}>
          <Logo /> {/* Renders the logo component */}
          <Social /> {/* Renders the social icons component */}
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
