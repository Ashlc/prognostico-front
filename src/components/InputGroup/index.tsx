import { InputText } from 'primereact/inputtext';

type Props = {
  label: string;
  value: string;
  readOnly?: boolean;
  className?: string;
};

const index = ({ label, value, readOnly, className }: Props) => {
  return (
    <div className={`flex flex-col gap-1 grow ${className}`}>
      <p className="text-slate-600 text-sm">{label}</p>
      <InputText value={value} readOnly={readOnly} className="grow" />
    </div>
  );
};

export default index;
