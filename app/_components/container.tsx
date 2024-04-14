import styles from '@/app/_components/container.module.css';
import { ReactNode } from 'react';

/**
 * Container Component
 * Renders a container with optional header styling.
 */
interface ContainerProps {
  children: ReactNode; // The content to be rendered inside the container.
  isHeader?: boolean; // Determines whether the container should have header styling.
}

/**
 * Renders a container component.
 * @param children - The content to be rendered inside the container.
 * @param isHeader - Determines whether the container should have header styling. Default is false.
 * @returns The rendered container component.
 */
function Container({ children, isHeader = false }: ContainerProps): React.ReactElement {
  const classList = [styles.container, isHeader ? styles.header : ''].filter(Boolean).join(' ');

  return <div className={classList}>{children}</div>;
}

export default Container;
