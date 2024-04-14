import styles from '@/app/_components/post-tags.module.css';
import { BLOG_PATH } from '@/app/_const/site-config';
import type { Tag } from '@/app/_lib/apollo-client';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

/**
 * Props for the PostTags component.
 */
interface PostTagsProps {
  tags?: Tag[]; // Array of tags
}

/**
 * Component that displays tags for a blog post.
 * @param tags - Array of tags to display
 * @returns The PostTags component
 */
function PostTags({ tags }: PostTagsProps): React.ReactElement {
  return (
    <div className={styles.flexContainer}>
      <ul className={styles.list}>
        {tags ? (
          tags.map(({ id, name, slug }) => (
            <li key={id}>
              <Link href={`/${BLOG_PATH}/tag/${slug}`}>
                <FontAwesomeIcon icon={faTag} />
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
