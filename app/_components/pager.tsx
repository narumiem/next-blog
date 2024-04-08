'use client';
import styles from '@/app/_components/pager.module.css';
import { blogPath } from '@/app/_const/site-config';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { MouseEvent } from 'react';

interface PagerProps {
  current: number;
  total: number;
  min?: number;
  max?: number;
}

function Pager({
  current,
  total,
  min = 1,
  max = 3,
}: PagerProps): React.ReactElement {
  const maxPages: number = Math.min(max, total);
  const modify: number = Math.max(current - max, 0);

  const handlePrevClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (current <= min) {
      e.preventDefault();
    }
  };
  const handleNextClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (current >= total) {
      e.preventDefault();
    }
  };
  const handleCurrentClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.currentTarget.classList.contains(styles.current)) {
      e.preventDefault();
    }
  };

  return (
    <ul className={styles.pager}>
      {/* 前へのリンク */}
      <li>
        <Link
          href={`/${blogPath}/page/${Number(current) - 1}`}
          className={`styles.prev ${current <= min ? styles.disable : ''}`}
          onClick={handlePrevClick}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
          <span className="sr-only">前へ</span>
        </Link>
      </li>

      {/* 省略記号の表示 */}
      {total > max && current > max && (
        <li className={styles.omit}>
          <span>…</span>
        </li>
      )}

      {/* ページ番号の表示 */}
      {Array.from({ length: maxPages }, (_, index) => (
        <li key={index + 1}>
          <Link
            href={`/${blogPath}/page/${index + 1 + modify}`}
            className={`${current - modify === index + 1 ? styles.current : ''}`}
            onClick={handleCurrentClick}
          >
            {index + 1 + modify}
          </Link>
        </li>
      ))}

      {/* 省略記号の表示 */}
      {total > max && total - 1 !== max && current !== total && current + 1 !== total && (
        <li className={styles.omit}>
          <span>…</span>
        </li>
      )}

      {/* 最終ページへのリンク */}
      {total > max && current !== total && (
        <li>
          <Link href={`/${blogPath}/page/${total}`}>{total}</Link>
        </li>
      )}

      {/* 次へのリンク */}
      <li>
        <Link
          href={`/${blogPath}/page/${Number(current) + 1}`}
          className={`styles.next ${current >= total ? styles.disable : ''}`}
          onClick={handleNextClick}
        >
          <span className="sr-only">次へ</span>
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      </li>
    </ul>
  );
}

export default Pager;
