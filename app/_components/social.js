import styles from '@/app/_components/social.module.css';
import siteConfig from '@/app/_const/siteConfig';
import { faFacebookF, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Social({ iconSize = 'initial'}) {
  return (
    <ul className={styles.list} style={{ '--icon-size': iconSize }}>
      <li>
        <a href={`https://twitter.com/${siteConfig.siteSocial.twitter}`} target="_blank">
          <FontAwesomeIcon icon={faTwitter} />
          <span className="sr-only">Twitter</span>
        </a>
      </li>
      <li>
        <a href={`https://facebook.com/${siteConfig.siteSocial.facebook}`} target="_blank">
          <FontAwesomeIcon icon={faFacebookF} />
          <span className="sr-only">Facebook</span>
        </a>
      </li>
      <li>
        <a href={`https://github.com/${siteConfig.siteSocial.github}`} target="_blank">
          <FontAwesomeIcon icon={faGithub} />
          <span className="sr-only">GitHub</span>
        </a>
      </li>
    </ul>
  );
}

