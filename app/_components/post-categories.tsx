import styles from '@/app/_components/post-categories.module.css';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import type { Category } from '@/app/_lib/microcms';

interface PostCategoriesProps {
  categories?: Category[];
}

function PostCategories({ categories }: PostCategoriesProps): React.ReactElement {
  return (
    <div className={styles.flexContainer}>
      <h3 className={styles.heading}>
        <FontAwesomeIcon icon={faFolderOpen} />
        <span className="sr-only">Categories</span>
      </h3>
      <ul className={styles.list}>
        {categories ? (
          categories.map(({ name, slug }) => (
            <li key={slug}>
              <Link href={`/blog/category/${slug}`}>{name}</Link>
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
