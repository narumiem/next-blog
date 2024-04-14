import styles from '@/app/_components/post-header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import ConvertDate from '@/app/_lib/dayjs';

/**
 * Props for the PostHeader component.
 */
interface PostHeaderProps {
  /** The title of the post. */
  title: string;
  /** The subtitle of the post. */
  subtitle: string;
  /** The publish date of the post. */
  publishDate?: string;
}

/**
 * The header component for a blog post.
 * @param title - The title of the post.
 * @param subtitle - The subtitle of the post.
 * @param publishDate - The publish date of the post.
 * @returns A React element representing the post header.
 */
function PostHeader({ title, subtitle, publishDate = '' }: PostHeaderProps): React.ReactElement {
  return (
    <div className={styles.stack}>
      <p className={styles.subtitle}>{subtitle}</p>
      <h1 className={styles.title}>{title}</h1>
      {publishDate && (
        <div className={styles.publishDate}>
          <FontAwesomeIcon icon={faClock} size="lg" color="var(--color-gray-25)" />
          <ConvertDate dateISO={publishDate} />
        </div>
      )}
    </div>
  );
}

export default PostHeader;
