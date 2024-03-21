import styles from '@/app/_components/post-header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import ConvertDate from '@/app/_lib/date-fns';

export default function PostHeader({ title, subtitle, publishDate = '' }) {
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
