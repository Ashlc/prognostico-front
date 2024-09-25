import logo from '@/assets/Logo.svg';
import Column from '@/components/Column';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Users } from 'lucide-react';
import { useState } from 'react';
import SidebarItem from './SidebarItem';

const Index = (props: Props) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="h-full w-fit border-r border-[--surface-border] select-none">
      <Column className="h-[80px] px-4 border-b border-[--surface-border] justify-center items-center">
        <img src={logo} alt="Logo Prognose" className="w-[32px]" />
      </Column>
      <Column className="px-4">
        <SidebarItem icon={<Users size={18} />} label="Pacientes" open={open} />
        <div className="h-[40px] flex items-center justify-center">About</div>
        <div className="h-[40px] flex items-center justify-center">Contact</div>
      </Column>
      <ThemeSwitcher />
    </div>
  );
};

export default Index;
