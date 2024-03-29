import Link from 'next/link';
import styles from '@/app/_components/logo.module.css';

interface LogoProps {
  boxOn?: Boolean;
}

function Logo({ boxOn = false }: LogoProps): React.ReactElement {
  return (
    <Link href="/" className={boxOn ? styles.box : styles.basic}>
      Next Blog
    </Link>
  );
}

export default Logo;
