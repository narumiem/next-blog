import styles from '@/app/_components/container.module.css';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  large?: boolean;
  isHeader?: boolean;
}

function Container({
  children,
  isHeader = false,
}: ContainerProps): React.ReactElement {
  const classList = [styles.container, isHeader ? styles.header : '']
    .filter(Boolean)
    .join(' ');
  
  return <div className={classList}>{children}</div>;
}

export default Container;
