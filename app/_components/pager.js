import styles from '@/app/_components/pager.module.css';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function Pager({ current, total, min = 1, max = 3 }) {
  const maxPages = parseInt(total) > max ? max : parseInt(total);
  const currentPage = parseInt(current);
  const totalPages = parseInt(total);
  const modify = currentPage > max ? currentPage - max : 0;

  return (
    <ul className={styles.pager}>
      {currentPage - 1 < min ? (
        <li className={`${styles.prev} ${styles.disable}`}>
          <div>
            <FontAwesomeIcon icon={faAngleLeft} />
            <span className="sr-only">前へ</span>
          </div>
        </li>
      ) : (
        <li className={styles.prev}>
          <Link href={`/blog/page/${currentPage - 1}`}>
            <FontAwesomeIcon icon={faAngleLeft} />
            <span className="sr-only">前へ</span>
          </Link>
        </li>
      )}

      {totalPages <= maxPages ? (
        ''
      ) : currentPage <= maxPages ? (
        ''
      ) : (
        <li className={styles.omit}>
          <span>…</span>
        </li>
      )}

      {Array.from({ length: maxPages }, (_, index) =>
        currentPage - modify === index + 1 ? (
          <li key={index + 1} className={styles.current}>
            <span>{index + 1 + modify}</span>
          </li>
        ) : (
          <li key={index + 1}>
            <Link href={`/blog/page/${index + 1 + modify}`}>
              {index + 1 + modify}
            </Link>
          </li>
        )
      )}

      {totalPages <= max ? (
        ''
      ) : totalPages === currentPage ? (
        ''
      ) : (
        <li className={styles.omit}>
          <span>…</span>
        </li>
      )}

      {totalPages <= max ? (
        ''
      ) : currentPage === totalPages || totalPages - 1 === max ? (
        ''
      ) : (
        <li>
          <Link href={`/blog/page/${total}`}>{total}</Link>
        </li>
      )}

      {currentPage + 1 > totalPages ? (
        <li className={`${styles.next} ${styles.disable}`}>
          <div>
            <span className="sr-only">次へ</span>
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </li>
      ) : (
        <li className={styles.next}>
          <Link href={`/blog/page/${currentPage + 1}`}>
            <span className="sr-only">次へ</span>
            <FontAwesomeIcon icon={faAngleRight} />
          </Link>
        </li>
      )}
    </ul>
  );
}
