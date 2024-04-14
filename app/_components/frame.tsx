import styles from '@/app/_components/frame.module.css';
import { ReactNode } from 'react';

interface FrameProps {
  children: ReactNode;
}

/**
 * A reusable frame component that wraps its children.
 * @param children - The content to be wrapped by the frame.
 * @returns The frame component.
 */
function Frame({ children }: FrameProps): React.ReactElement {
  return <div className={styles.frame}>{children}</div>;
}

export default Frame;
