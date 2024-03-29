import styles from '@/app/_components/pagination.module.css';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

interface PaginationProps {
  prevText?: string;
  prevUrl?: string;
  nextText?: string;
  nextUrl?: string;
}

function Pagination({
  prevText = '',
  prevUrl = '',
  nextText = '',
  nextUrl = '',
}: PaginationProps): React.ReactElement {
  return (
    <ul className={styles.flexContainer}>
      {prevText && prevUrl && (
        <li className={styles.prev}>
          <Link href={prevUrl} className={styles.iconText}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              color="var(--color-gray-25)"
            />
            <span>{prevText}</span>
          </Link>
        </li>
      )}
      {nextText && nextUrl && (
        <li className={styles.next}>
          <Link href={nextUrl} className={styles.iconText}>
            <span>{nextText}</span>
            <FontAwesomeIcon
              icon={faChevronRight}
              color="var(--color-gray-25)"
            />
          </Link>
        </li>
      )}
    </ul>
  );
}

export default Pagination;
