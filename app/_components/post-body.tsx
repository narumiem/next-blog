import styles from '@/app/_components/post-body.module.css';

interface PostBodyProps {
  children: React.ReactNode;
}

function PostBody({ children }: PostBodyProps): React.ReactElement {
  return <div className={`${styles.postBody} ${styles.stack}`}>{children}</div>;
}
export default PostBody;
