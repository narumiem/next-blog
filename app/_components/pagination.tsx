import styles from '@/app/_components/pagination.module.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

// Define the props for the Pagination component
interface PaginationProps {
  prevText?: string; // Text for the previous link
  prevUrl?: string; // URL for the previous link
  nextText?: string; // Text for the next link
  nextUrl?: string; // URL for the next link
}

/**
 * Pagination component for navigating between pages.
 * @param prevText - Text for the previous link.
 * @param prevUrl - URL for the previous link.
 * @param nextText - Text for the next link.
 * @param nextUrl - URL for the next link.
 * @returns React element representing the pagination component.
 */
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
          {/* Link to the previous page */}
          <Link href={prevUrl} className={styles.iconText}>
            <FontAwesomeIcon icon={faChevronLeft} color="var(--color-gray-25)" />
            <span>{prevText}</span>
          </Link>
        </li>
      )}
      {nextText && nextUrl && (
        <li className={styles.next}>
          {/* Link to the next page */}
          <Link href={nextUrl} className={styles.iconText}>
            <span>{nextText}</span>
            <FontAwesomeIcon icon={faChevronRight} color="var(--color-gray-25)" />
          </Link>
        </li>
      )}
    </ul>
  );
}

export default Pagination;
