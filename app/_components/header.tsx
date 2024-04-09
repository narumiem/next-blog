import Logo from '@/app/_components/logo';
import Nav, { PageList } from '@/app/_components/nav';
import styles from '@/app/_components/header.module.css';
import Container from '@/app/_components/container';
import { getAllPages } from '@/app/_lib/apollo-client';

async function Header(): Promise<React.ReactElement> {
  const allPages = (await getAllPages()) ?? [];
  const pageList: PageList[] = allPages.map(({ id, slug, title }) => ({ id, slug, title }));

  return (
    <header className={styles.header}>
      <Container large isHeader>
        <div className={styles.flexContainer}>
          <Logo boxOn />
          <Nav pageList={pageList} />
        </div>
      </Container>
    </header>
  );
}

export default Header;
