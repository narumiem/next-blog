import styles from '@/app/_components/post-categories.module.css';
import { BLOG_PATH } from '@/app/_const/site-config';
import type { Category } from '@/app/_lib/apollo-client';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

interface PostCategoriesProps {
  categories?: Category[];
}

function PostCategories({ categories }: PostCategoriesProps): React.ReactElement {
  return (
    <div className={styles.flexContainer}>
      <ul className={styles.list}>
        {categories ? (
          categories.map(({ id, name, slug }) => (
            <li key={id}>
              <Link href={`/${BLOG_PATH}/category/${slug}`}>
                <FontAwesomeIcon icon={faFolderOpen} />
                <span className="sr-only">Categories</span>
                <span>{name}</span>
              </Link>
            </li>
          ))
        ) : (
          <li>No Categories</li>
        )}
      </ul>
    </div>
  );
}

export default PostCategories;
