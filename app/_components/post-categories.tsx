import styles from '@/app/_components/post-categories.module.css';
import { Category } from '@/app/_lib/apollo-client';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

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
          categories.map(({ id,name, slug }) => (
            <li key={id}>
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
