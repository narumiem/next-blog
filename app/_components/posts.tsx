import styles from '@/app/_components/posts.module.css';
import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/app/_lib/microcms';

interface PostsProps {
  posts?: Post[];
}

function Posts({ posts }: PostsProps): React.ReactElement {
  return (
    <div className={styles.gridContainer}>
      {posts &&
        posts.map(({ title, slug, eyecatch }) => (
          <article key={slug} className={styles.post}>
            <Link href={`/blog/${slug}`}>
              <figure>
                {eyecatch && eyecatch.url && eyecatch.blurDataURL ? (
                  <Image
                    src={eyecatch.url}
                    alt=""
                    fill
                    sizes="(min-width: 1152px) 576px, 50vw"
                    placeholder="blur"
                    blurDataURL={eyecatch.blurDataURL}
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
