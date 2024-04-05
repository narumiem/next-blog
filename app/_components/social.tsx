import styles from '@/app/_components/social.module.css';
import { siteConfig } from '@/app/_const/site-config';
import { faFacebookF, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SocialProps {
  iconSize?: string;
}

function Social({ iconSize = 'initial' }: SocialProps): React.ReactElement {
  const {
    siteSocial: { twitter, facebook, github },
  } = siteConfig;

  const socialLinks = [
    { name: 'Twitter', url: `https://twitter.com/${twitter}`, icon: faTwitter },
    {
      name: 'Facebook',
      url: `https://facebook.com/${facebook}`,
      icon: faFacebookF,
    },
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
