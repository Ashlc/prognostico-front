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
      icon={icon}
      label={open ? label : ''}
      aria-label={label}
      text
      className="gap-2"
    />
  );
};

export default SidebarItem;
