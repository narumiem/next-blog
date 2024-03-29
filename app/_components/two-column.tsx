import styles from '@/app/_components/two-column.module.css';
import { ReactNode } from 'react';

interface TwoColumnProps {
  children: ReactNode;
}

function TwoColumn({ children }: TwoColumnProps): React.ReactElement {
  return <div className={styles.flexContainer}>{children}</div>;
}

TwoColumn.Main = function Main({ children }: TwoColumnProps): React.ReactElement {
  return <div className={styles.main}>{children}</div>;
};

TwoColumn.Sidebar = function Sidebar({ children }: TwoColumnProps): React.ReactElement {
  return <div className={styles.sidebar}>{children}</div>;
};

export default TwoColumn;
