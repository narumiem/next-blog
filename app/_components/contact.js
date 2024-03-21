import styles from '@/app/_components/contact.module.css';
import Social from '@/app/_components/social';

export default function Contact() {
  return(
    <div className={styles.stack}>
      <h3 className={styles.heading}>Contact</h3>
      <Social iconSize="30px" />
      <address>narumiem@gmail.com</address>
    </div>
  )
}