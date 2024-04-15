import Link from 'next/link';
import styles from '@/app/_components/logo.module.css';
import { siteMetadata } from '@/app/_lib/metadata';

/**
 * Logo Component
 * Renders a logo with an optional box around it.
 */
interface LogoProps {
  /**
   * Determines whether to display a box around the logo.
   */
  boxOn?: boolean;
}

/**
 * Renders the Logo component.
 * @param {LogoProps} props - The props for the Logo component.
 * @returns {React.ReactElement} The rendered Logo component.
 */
function Logo({ boxOn = false }: LogoProps): React.ReactElement {
  const { siteTitle } = siteMetadata;
  return (
    <Link href="/" className={boxOn ? styles.box : styles.basic}>
      {siteTitle}
    </Link>
  );
}

export default Logo;
