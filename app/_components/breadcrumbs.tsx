'use client';
import { usePathname } from 'next/navigation';
import styles from '@/app/_components/breadcrumbs.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { BLOG_PATH } from '@/app/_const/site-config';

/**
 * Breadcrumbs Component
 * Renders a breadcrumb navigation based on the current pathname.
 * @returns The Breadcrumbs component.
 */
function Breadcrumbs(): React.ReactElement | null {
  const pathname = usePathname();
  const pathnames = pathname.split('/').filter((item) => item !== '');
  const faIcon = faCaretRight;

  if (pathnames.length === 0) {
    return null;
  }

  return (
    <ul className={styles.breadcrumbs}>
      {/* Render the Home breadcrumb */}
      <li className={styles.item}>
        <Link href="/">Home</Link>
        <FontAwesomeIcon icon={faIcon} />
      </li>
      {pathnames.map((path, index) => {
        return (
          <li key={path} className={styles.item}>
            {index === pathnames.length - 1 ? (
              // Render the current path as plain text
              <span>{path}</span>
            ) : (
              <>
                {path === 'category' || path === 'page' ? (
                  // Render the special paths as plain text
                  <>
                    <span>{path}</span>
                    <FontAwesomeIcon icon={faIcon} />
                  </>
                ) : (
                  // Render other paths as links
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

/**
 * Generates the URL for a breadcrumb link based on the pathnames and index.
 * @param pathnames - The array of pathnames.
 * @param index - The current index.
 * @returns The generated URL.
 */
function generateUrl(pathnames: string[], index: number): string {
  const path =
    pathnames.slice(0, index + 1).join('/') === BLOG_PATH
      ? pathnames.slice(0, index + 1).join('/') + '/page/1'
      : pathnames.slice(0, index + 1).join('/');

  return '/' + path;
}

export default Breadcrumbs;
