import styles from '@/app/_components/post-body.module.css';

/**
 * Represents the body of a blog post.
 */
interface PostBodyProps {
  /** The content of the post body. */
  children: React.ReactNode;
}

/**
 * Renders the body of a blog post.
 * @param {PostBodyProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered component.
 */
function PostBody({ children }: PostBodyProps): React.ReactElement {
  return <div className={styles.stack}>{children}</div>;
}

export default PostBody;
