import styles from '@/app/_components/social.module.css';
import { siteSocial } from '@/app/_const/site-config';
import { faFacebookF, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Props for the Social component
interface SocialProps {
  iconSize?: string; // Optional prop to specify the size of the icons
}

/**
 * Social component displays social media links with icons.
 * @param {SocialProps} props - The props for the Social component.
 * @returns {React.ReactElement} The rendered Social component.
 */
function Social({ iconSize = 'initial' }: SocialProps): React.ReactElement {
  const { twitter, facebook, github } = siteSocial;

  // Array of social media links with their names, URLs, and icons
  const socialLinks = [
    { name: 'Twitter', url: `https://twitter.com/${twitter}`, icon: faTwitter },
    { name: 'Facebook', url: `https://facebook.com/${facebook}`, icon: faFacebookF },
    { name: 'Github', url: `https://github.com/${github}`, icon: faGithub },
  ];

  return (
    <ul className={styles.list} style={{ '--icon-size': iconSize } as React.CSSProperties}>
      {socialLinks.map(({ name, url, icon }) => (
        <li key={name}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={icon} />
            <span className="sr-only">{name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Social;
