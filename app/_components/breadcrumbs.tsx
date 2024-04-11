'use client';
import { usePathname } from 'next/navigation';
import styles from '@/app/_components/breadcrumbs.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { BLOG_PATH } from '@/app/_const/site-config';

function Breadcrumbs(): React.ReactElement | null {
  const pathname = usePathname();
  const pathnames = pathname.split('/').filter((item) => item !== '');
  const faIcon = faCaretRight;

  if (pathnames.length === 0) {
    return null;
  }

  return (
    <ul className={styles.breadcrumbs}>
      <li className={styles.item}>
        <Link href="/">Home</Link>
        <FontAwesomeIcon icon={faIcon} />
      </li>
      {pathnames.map((path, index) => {
        return (
          <li key={path} className={styles.item}>
            {index === pathnames.length - 1 ? (
              <span>{path}</span>
            ) : (
              <>
                {path === 'category' || path === 'page' ? (
                  <>
                    <span>{path}</span>
                    <FontAwesomeIcon icon={faIcon} />
                  </>
                ) : (
                  <>
                    <Link href={generateUrl(pathnames, index)}>{path}</Link>
                    <FontAwesomeIcon icon={faIcon} />
                  </>
                )}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function generateUrl(pathnames: string[], index: number): string {
  const path =
    pathnames.slice(0, index + 1).join('/') === BLOG_PATH
      ? pathnames.slice(0, index + 1).join('/') + '/page/1'
      : pathnames.slice(0, index + 1).join('/');

  return '/' + path;
}

export default Breadcrumbs;
