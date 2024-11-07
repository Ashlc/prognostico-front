import Logo from '@/assets/Logo.svg';
import Column from '@/components/Column';
import Row from '@/components/Row';
import { Menubar } from 'primereact/menubar';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate()

  const menuItems = [
    { 
      label: 'Pacientes', 
      command: () =>  navigate('/'),
    }, 
    { label: 'Usuários', 
      command: () =>  navigate('/users')
    }
  ];

  useEffect(() => {
    const elements = document.querySelectorAll('[aria-hidden]');
    elements.forEach(element => {
      element.removeAttribute('aria-hidden');
    });
  }, []);

  return (
    <Column className="w-full h-screen">
      <Menubar
        className="bg-white border-b font-medium px-4 "
        model={menuItems}
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
