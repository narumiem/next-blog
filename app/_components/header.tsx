import Logo from '@/app/_components/logo';
import Nav, { PageList } from '@/app/_components/nav';
import styles from '@/app/_components/header.module.css';
import Container from '@/app/_components/container';
import { getAllPages } from '@/app/_lib/apollo-client';

/**
 * Renders the header component.
 * @returns A Promise that resolves to a React element representing the header.
 */
async function Header(): Promise<React.ReactElement> {
  // Fetch all pages using the getAllPages function
  const allPages = (await getAllPages()) ?? [];

  // Map the fetched pages to the PageList interface
  const pageList: PageList[] = allPages.map(({ id, menuOrder, slug, title }) => ({
    id,
    menuOrder,
    slug,
    title,
  }));

  return (
    <header className={styles.header}>
      <Container isHeader>
        <div className={styles.flexContainer}>
          {/* Render the Logo component */}
          <Logo boxOn />

          {/* Render the Nav component with the pageList */}
          <Nav pageList={pageList} />
        </div>
      </Container>
    </header>
  );
}

export default Header;
