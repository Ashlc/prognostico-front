import { InputText } from 'primereact/inputtext';

type Props = {
  label: string;
  value: string;
  name?: string;
  readOnly?: boolean;
  handleChange?: Function
  className?: string;
};

const index = ({ label, name, value, readOnly, handleChange, className }: Props) => {

  return (
    <div className={`flex flex-col gap-1 grow ${className}`}>
      <p className="text-slate-600 text-sm">{label}</p>
      <InputText 
        value={value} 
        name = {name ? name : label} 
        readOnly={readOnly} 
        className="grow" 
        onChange={(e) => handleChange && handleChange(e)}
      />
    </div>
  );
};

export default index;
