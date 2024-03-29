import styles from '@/app/_components/container.module.css';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  large?: boolean;
}

function Container({
  children,
  large = false,
}: ContainerProps): React.ReactElement {
  return (
    <div className={large ? styles.large : styles.default}>{children}</div>
  );
}

export default Container;
