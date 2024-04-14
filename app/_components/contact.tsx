import styles from '@/app/_components/contact.module.css';
import Social from '@/app/_components/social';
import { siteMetadata } from '@/app/_lib/metadata';
import { icon } from '@fortawesome/fontawesome-svg-core';

/**
 * Contact Component
 * Renders the contact section with a heading, social icons, and email address.
 *
 * @returns The rendered Contact component.
 */
function Contact(): React.ReactElement {
  const { siteEmail } = siteMetadata; // Destructure the site email from siteMetadata
  const iconSize = '30px'; // Size of the social icons

  return (
    <div className={styles.stack}>
      {/* Contact heading */}
      <h3 className={styles.heading}>Contact</h3>

      {/* Social icons */}
      <Social iconSize={iconSize} />

      {/* Email address */}
      <address>{siteEmail}</address>
    </div>
  );
}

export default Contact;
