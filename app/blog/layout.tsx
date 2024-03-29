import BlueFrame from '@/app/_components/blue-frame';
import { ReactNode } from 'react';

interface BloglayoutProps {
  children: ReactNode;
}
function Bloglayout({ children }: BloglayoutProps): React.ReactElement {
  return <BlueFrame>{children}</BlueFrame>;
}

export default Bloglayout;
