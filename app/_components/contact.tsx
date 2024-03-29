import styles from '@/app/_components/contact.module.css';
import Social from '@/app/_components/social';
import { siteConfig } from '@/app/_const/site-config';

function Contact(): React.ReactElement {
  const { siteEmail } = siteConfig;

  return (
    <div className={styles.stack}>
      <h3 className={styles.heading}>Contact</h3>
      <Social iconSize="30px" />
      <address>{siteEmail}</address>
    </div>
  );
}

export default Contact;
