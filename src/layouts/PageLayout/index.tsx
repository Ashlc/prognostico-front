import Row from '@/components/Row';
import Sidebar from '@/components/Sidebar';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Index = ({ children }: Props) => (
  <Row className="w-full h-screen">
    <Sidebar />
    {children}
  </Row>
);

export default Index;
