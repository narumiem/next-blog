'use client';
import Link from 'next/link';
import styles from '@/app/_components/nav.module.css';
import { useState } from 'react';
import { blogPath } from '@/app/_const/site-config';

function Nav(): React.ReactElement {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const toggleNav = () => {
    setNavIsOpen((prev: boolean) => !prev);
  };
  const closeNav = () => {
    setNavIsOpen(false);
  };

  return (
    <nav className={navIsOpen ? styles.open : styles.close}>
      {navIsOpen && (
        <style jsx global>{`
          @media (max-width: 768px) {
            body {
              overflow: hidden;
              position: fixed;
              width: 100%;
            }
          }
        `}</style>
      )}
      <button className={styles.button} onClick={toggleNav}>
        <span className={styles.bar}></span>
        <span className="sr-only">MENU</span>
      </button>
      <ul className={styles.list} onClick={closeNav}>
        <li>
          <Link href="/" onClick={closeNav}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={closeNav}>
            About
          </Link>
        </li>
        <li>
          <Link href={`/${blogPath}/page/1`} onClick={closeNav}>
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
