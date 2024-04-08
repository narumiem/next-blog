import styles from '@/app/_components/posts.module.css';
import { blogPath } from '@/app/_const/site-config';
import type { Post } from '@/app/_lib/apollo-client';
import Image from 'next/image';
import Link from 'next/link';

interface PostsProps {
  posts?: Post[];
}

function Posts({ posts }: PostsProps): React.ReactElement {
  return (
    <div className={styles.gridContainer}>
      {posts?.map(({ id, title, slug, featuredImage }) => (
        <article key={id} className={styles.post}>
          <Link href={`/${blogPath}/${slug}`}>
            <figure>
              {featuredImage?.node?.mediaItemUrl && featuredImage.node.blurDataURL ? (
                <Image
                  src={featuredImage.node.mediaItemUrl}
                  alt={featuredImage.node.altText ?? ''}
                  fill
                  sizes="(min-width: 1152px) 576px, 50vw"
                  placeholder="blur"
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
