import styles from '@/app/_components/blue-frame.module.css';
import Container from '@/app/_components/container';
import Link from 'next/link';

export default function BlueFrame({ children }) {
  return (
    <div className={styles.frame}>
      <Container>{children}</Container>
      <Link href="/blog" className={styles.sideButton}>
        Recent Blog Posts
      </Link>
    </div>
  );
}
