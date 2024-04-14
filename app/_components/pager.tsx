'use client';
import styles from '@/app/_components/pager.module.css';
import { BLOG_PATH } from '@/app/_const/site-config';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { MouseEvent } from 'react';

/**
 * Props for the Pager component.
 */
interface PagerProps {
  current: number; // The current page number
  total: number; // The total number of pages
  min?: number; // The minimum page number (default: 1)
  max?: number; // The maximum number of pages to display (default: 3)
}

/**
 * A pager component for navigating between pages.
 */
function Pager({ current, total, min = 1, max = 3 }: PagerProps): React.ReactElement {
  const maxPages: number = Math.min(max, total); // The maximum number of pages to display
  const modify: number = Math.max(current - max, 0); // The modification value for page numbers

  /**
   * Handles the click event for the previous button.
   * Prevents navigation if the current page is already at the minimum.
   */
  const handlePrevClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (current <= min) {
      e.preventDefault();
    }
  };

  /**
   * Handles the click event for the next button.
   * Prevents navigation if the current page is already at the maximum.
   */
  const handleNextClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (current >= total) {
      e.preventDefault();
    }
  };

  /**
   * Handles the click event for the current page link.
   * Prevents navigation if the current page link is already active.
   */
  const handleCurrentClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.currentTarget.classList.contains(styles.current)) {
      e.preventDefault();
    }
  };

  return (
    <ul className={styles.pager}>
      <li>
        <Link
          href={`/${BLOG_PATH}/page/${Number(current) - 1}`}
          className={`styles.prev ${current <= min ? styles.disable : ''}`}
          onClick={handlePrevClick}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
          <span className="sr-only">Previous</span>
        </Link>
      </li>

      {total > max && current > max && (
        <li className={styles.omit}>
          <span>…</span>
        </li>
      )}

      {Array.from({ length: maxPages }, (_, index) => (
        <li key={index + 1}>
          <Link
            href={`/${BLOG_PATH}/page/${index + 1 + modify}`}
            className={`${current - modify === index + 1 ? styles.current : ''}`}
            onClick={handleCurrentClick}
          >
            {index + 1 + modify}
          </Link>
        </li>
      ))}

      {total > max && total - 1 !== max && current !== total && current + 1 !== total && (
        <li className={styles.omit}>
          <span>…</span>
        </li>
      )}

      {total > max && current !== total && (
        <li>
          <Link href={`/${BLOG_PATH}/page/${total}`}>{total}</Link>
        </li>
      )}

      <li>
        <Link
          href={`/${BLOG_PATH}/page/${Number(current) + 1}`}
          className={`styles.next ${current >= total ? styles.disable : ''}`}
          onClick={handleNextClick}
        >
          <span className="sr-only">Next</span>
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      </li>
    </ul>
  );
}

export default Pager;
