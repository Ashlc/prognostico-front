import ColumnDiv from '@/components/Column';
import Row from '@/components/Row';
import { IPatient } from '@/interfaces/IUser';
import { mockPatients } from '@/services/mock';
import { Search } from 'lucide-react';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import {
  DataTable,
  DataTableFilterMeta,
  DataTableRowClickEvent,
} from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const navigate = useNavigate();

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const header = (
    <IconField iconPosition="left">
      <InputIcon>
        <Search size={16} />
      </InputIcon>
      <InputText
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
        placeholder="Pesquisar"
        className="w-full"
      />
    </IconField>
  );

  const age = (rowData: IPatient) => {
    const today = new Date();
    const birthDate = new Date(rowData.birthDate);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  const renderStatus = (rowData: IPatient) => {
    return (
      <Tag rounded severity={rowData.status === 'ACTIVE' ? null : 'secondary'}>
        {rowData.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
      </Tag>
    );
  };

  const onRowClick = (e: DataTableRowClickEvent) => {
    navigate(`/patients/${e.data.id}`);
  };

  return (
    <ColumnDiv className="h-screen w-full">
      <ColumnDiv className="mx-auto w-11/12 py-10 gap-10">
        <Row className="justify-between items-center pb-4 border-b">
          <p className="text-2xl font-bold text-primary-600">PACIENTES</p>
        </Row>
        <ColumnDiv className="w-full gap-6">
          <DataTable
            className="rounded-lg overflow-clip"
            globalFilterFields={['name', 'cpf', 'email']}
            header={header}
            selectionMode="single"
            value={mockPatients}
            emptyMessage="Nenhum paciente encontrado"
            filters={filters}
            onRowClick={onRowClick}
          >
            <Column field="name" header="Nome" />
            <Column field="email" header="Email" />
            <Column field="cpf" header="CPF" />
            <Column field="birthDate" header="Idade" body={age} />
            <Column field="sex" header="Sexo" />
            <Column field="status" header="Status" body={renderStatus} />
          </DataTable>
        </ColumnDiv>
      </ColumnDiv>
    </ColumnDiv>
  );
};

export default Index;
