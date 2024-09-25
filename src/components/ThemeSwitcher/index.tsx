import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';
import { Button } from 'primereact/button';

const index = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      icon={theme === 'light' ? <Sun /> : <Moon />}
      onClick={toggleTheme}
    />
  );
};

export default index;
