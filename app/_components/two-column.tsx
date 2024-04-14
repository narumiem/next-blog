import styles from '@/app/_components/two-column.module.css';
import { ReactNode } from 'react';

/**
 * A component that renders a two-column layout.
 */
interface TwoColumnProps {
  children: ReactNode; // The content to be rendered inside the two columns.
}

/**
 * The main component of the TwoColumn layout.
 * Renders the main content column.
 */
function TwoColumn({ children }: TwoColumnProps): React.ReactElement {
  return <div className={styles.flexContainer}>{children}</div>;
}

/**
 * The Main component of the TwoColumn layout.
 * Renders the main content column.
 */
TwoColumn.Main = function Main({ children }: TwoColumnProps): React.ReactElement {
  return <div className={styles.main}>{children}</div>;
};

/**
 * The Sidebar component of the TwoColumn layout.
 * Renders the sidebar content column.
 */
TwoColumn.Sidebar = function Sidebar({ children }: TwoColumnProps): React.ReactElement {
  return <div className={styles.sidebar}>{children}</div>;
};

export default TwoColumn;
