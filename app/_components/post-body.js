import styles from '@/app/_components/post-body.module.css';

export default function PostBody({ children }) {
  return (
    <div className={styles.stack}>
      {children}
    </div>
  )
}