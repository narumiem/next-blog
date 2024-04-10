'use client';
import Link from 'next/link';
import styles from '@/app/_components/nav.module.css';
import { useState } from 'react';
import { blogPath } from '@/app/_const/site-config';

export interface PageList {
  id: string;
  menuOrder?: number;
  slug: string;
  title: string;
}
interface NavProps {
  pageList: PageList[];
}

function Nav({ pageList }: NavProps): React.ReactElement {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const toggleNav = () => {
    setNavIsOpen((prev: boolean) => !prev);
  };
  const closeNav = () => {
    setNavIsOpen(false);
  };

  return (
    <nav className={navIsOpen ? styles.open : styles.close}>
      <button className={styles.button} onClick={toggleNav}>
        <span className={styles.bar}></span>
        <span className="sr-only">MENU</span>
      </button>
      <ul className={styles.list}>
        <li>
          <Link href="/" onClick={closeNav}>
            Home
          </Link>
        </li>
        <li>
          <Link href={`/${blogPath}/page/1`} onClick={closeNav}>
            Blog
          </Link>
        </li>
        {pageList &&
          pageList.map(
            ({ id, menuOrder, slug, title }) =>
              menuOrder && (
                <li key={id}>
                  <Link href={`/${slug}`} onClick={closeNav}>
                    {title}
                  </Link>
                </li>
              )
          )}
      </ul>
    </nav>
  );
}

export default Nav;
