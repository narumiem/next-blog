'use client';
import { usePathname } from 'next/navigation';
import styles from '@/app/_components/breadcrumbs.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

export function Breadcrumbs() {
  const pathname = usePathname();
  const pathnames = pathname.split('/').filter((item) => item !== '');
  const faIcon = faCaretRight;

  return pathnames.length === 0 ? null : (
    <ul className={styles.breadcrumbs}>
      <li className={styles.item}>
        <Link href="/">Home</Link>
        <FontAwesomeIcon icon={faIcon} />
      </li>
      {pathnames.map((path, index) => {
        return path === 'category' ? null : (
          <li key={path} className={styles.item}>
            {index === pathnames.length - 1 ? (
              <span>{path}</span>
            ) : (
              <>
                <Link href={generateUrl(pathnames, index)}>{path}</Link>
                <FontAwesomeIcon icon={faIcon} />
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function generateUrl(pathnames, index) {
  return '/' + pathnames.slice(0, index + 1).join('/');
}
