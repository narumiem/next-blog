import Link from 'next/link';
import styles from '@/app/_components/logo.module.css';

export default function Logo({ boxOn = false }) {
  return (
    <Link href="/" className={boxOn ? styles.box : styles.basic}>Next Blog</Link>
  )
}