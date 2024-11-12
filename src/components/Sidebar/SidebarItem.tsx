import { Button } from 'primereact/button';
import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  open?: boolean;
  label: string;
  onHandleClick: () => void;
};

const SidebarItem = ({ icon, label, open, onHandleClick }: Props) => {
  return (
    <Button
      icon={open ? icon : ''}
      label={open ? label : ''}
      aria-label={label}
      text
      className={open ? 'gap-2' : ''}
      onClick={() => onHandleClick()}
    >
      {!open && icon}
    </Button>
  );
};

export default SidebarItem;
