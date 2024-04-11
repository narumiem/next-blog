import styles from '@/app/_components/post-tags.module.css';
import { BLOG_PATH } from '@/app/_const/site-config';
import type { Tag } from '@/app/_lib/apollo-client';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

interface PostTagsProps {
  tags?: Tag[];
}

function PostTags({ tags }: PostTagsProps): React.ReactElement {
  return (
    <div className={styles.flexContainer}>
      <ul className={styles.list}>
        {tags ? (
          tags.map(({ id, name, slug }) => (
            <li key={id}>
              <Link href={`/${BLOG_PATH}/tag/${slug}`}>
                <FontAwesomeIcon icon={faTag} />
                <span className="sr-only">Tags</span>
                <span>{name}</span>
              </Link>
            </li>
          ))
        ) : (
          <li>No Tags</li>
        )}
      </ul>
    </div>
  );
}

export default PostTags;
