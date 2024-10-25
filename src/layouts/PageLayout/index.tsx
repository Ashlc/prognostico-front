import Logo from '@/assets/Logo.svg';
import Column from '@/components/Column';
import Row from '@/components/Row';
import { Menubar } from 'primereact/menubar';
import { Outlet } from 'react-router-dom';

const Index = () => {
  const menuItems = [{ label: 'Pacientes' }, { label: 'Usuários' }];

  return (
    <Column className="w-full h-screen">
      <Menubar
        model={menuItems}
        className="bg-white border-b font-medium px-4"
        start={
          <Row className="items-center mr-3 gap-2">
            <img src={Logo} alt="Prognose" className="h-6 mb-0.5" />
            <p className="font-bold">Prognose</p>
            <div className="h-6 border-l ml-3" />
          </Row>
        }
      />
      <Outlet />
    </Column>
  );
};
export default Index;
