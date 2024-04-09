import styles from '@/app/_components/frame.module.css'
import { ReactNode } from 'react';

interface FrameProps {
  children: ReactNode;
}
function Frame({ children }: FrameProps): React.ReactElement {
  return <div className={styles.frame}>{children}</div>;
}
export default Frame;
