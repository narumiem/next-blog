import styles from '@/app/_components/blue-frame.module.css';
import Container from '@/app/_components/container';
import { blogPath } from '@/app/_const/site-config';
import Link from 'next/link';
import { ReactNode } from 'react';

interface BlueFrameProps {
  children: ReactNode;
}

function BlueFrame({ children }: BlueFrameProps): React.ReactElement {
  return (
    <div className={styles.frame}>
      <Container>{children}</Container>
      <Link href={`${blogPath}`} className={styles.sideButton}>
        Recent Blog Posts
      </Link>
    </div>
  );
}

export default BlueFrame;
