import { Button } from 'primereact/button';
import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  open?: boolean;
  label: string;
};

const SidebarItem = ({ icon, label, open }: Props) => {
  return (
    <Button
      icon={open ? icon : ''}
      label={open ? label : ''}
      aria-label={label}
      text
      className={open ? 'gap-2' : ''}
    >
      {!open && icon}
    </Button>
  );
};

export default SidebarItem;
