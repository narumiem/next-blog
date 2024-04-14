import PostEyecatch from '@/app/_components/post-eyecatch';
import styles from '@/app/_components/posts.module.css';
import { BLOG_PATH } from '@/app/_const/site-config';
import type { Post } from '@/app/_lib/apollo-client';
import Link from 'next/link';

/**
 * Renders a list of posts.
 * @param posts - An array of Post objects.
 */
interface PostsProps {
  posts?: Post[];
}

/**
 * Component that renders a list of posts.
 * @param posts - An array of Post objects.
 * @returns A React element representing the list of posts.
 */
function Posts({ posts }: PostsProps): React.ReactElement {
  return (
    <div className={styles.gridContainer}>
      {posts?.map(({ id, title, slug, featuredImage }) => (
        <article key={id} className={styles.post}>
          <Link href={`/${BLOG_PATH}/${slug}`}>
            <figure>
              {featuredImage?.node?.mediaItemUrl && featuredImage.node.blurDataURL ? (
                <PostEyecatch
                  src={featuredImage.node.mediaItemUrl}
                  alt={featuredImage.node.altText ?? ''}
                  sizes="(max-width: 1220px) 50vw, 610px"
                  blurDataURL={featuredImage.node.blurDataURL}
                />
              ) : (
                <span>No Image</span>
              )}
            </figure>
            <h2>{title}</h2>
          </Link>
        </article>
      ))}
    </div>
  );
}

export default Posts;
