import Logo from '@/app/_components/logo';
import styles from '@/app/_components/footer.module.css';
import Container from '@/app/_components/container';
import Social from '@/app/_components/social';


export default function Footer() {
  return (
    <footer className={styles.wrapper}>
      <Container>
        <div className={styles.flexContaier}>
          <Logo />
          <Social />
        </div>
      </Container>
    </footer>
  );
}