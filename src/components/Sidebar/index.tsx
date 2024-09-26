import logo from '@/assets/Logo.svg';
import Column from '@/components/Column';
import { Stethoscope, Users } from 'lucide-react';
import { Button } from 'primereact/button';
import { useState } from 'react';
import SidebarItem from './SidebarItem';

const Index = (props: Props) => {
  const [open, setOpen] = useState(true);
  const toggle = () => setOpen(!open);
  return (
    <div className="h-full w-fit border-r select-none">
      <Column className="h-[80px] px-4 border-b justify-center items-center">
        <Button text onClick={toggle} className="aspect-square">
          <img src={logo} alt="Logo Prognose" className="w-[32px]" />
        </Button>
      </Column>
      <Column className="p-4 items-center">
        <SidebarItem
          icon={<Stethoscope size={18} />}
          label="Pacientes"
          open={open}
        />
        <SidebarItem icon={<Users size={18} />} label="Usuários" open={open} />
      </Column>
    </div>
  );
};

export default Index;
