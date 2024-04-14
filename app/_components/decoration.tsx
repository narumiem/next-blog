import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@/app/_components/decoration.module.css';

/**
 * Decoration Component
 * Renders a decorative icon using FontAwesomeIcon.
 */
function Decoration() {
  return <FontAwesomeIcon icon={faSeedling} className={styles.decoration} />;
}

export default Decoration;
