import Logo from '@/app/_components/logo';
import Nav from '@/app/_components/nav';
import styles from '@/app/_components/header.module.css';
import Container from '@/app/_components/container';
import Breadcrumbs from '@/app/_components/breadcrumbs';

function Header(): React.ReactElement {
  return (
    <header>
      <Container large>
        <div className={styles.flexContainer}>
          <Logo boxOn />
          <Nav />
        </div>
        <Breadcrumbs />
      </Container>
    </header>
  );
}

export default Header;
