import ColumnDiv from '@/components/Column';
import Row from '@/components/Row';
import { IPatient } from '@/interfaces/IUser';
import { Plus, Search } from 'lucide-react';
import { FilterMatchMode } from 'primereact/api';
// import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import {
  DataTable,
  DataTableFilterMeta,
  DataTableRowClickEvent,
} from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

const Index = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = (await api.get({
          url: `/users`,
        })) as unknown as never[];
        setPatients(response);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPatients();
  }, []);

  const navigate = useNavigate();

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };

    _filters['global'] = { ..._filters['global'], value: value };

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



  const renderStatus = (rowData: IPatient) => {
    return (
      <Tag rounded severity={rowData.status === true ? null : 'secondary'}>
        {rowData.status === true ? 'Ativo' : 'Inativo'}
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

          <Button
            label="Adicionar Paciente"
            icon={<Plus size={18} />}
            className="flex gap-2"
            onClick={() => navigate('/novo')}
          />
        </Row>
        <ColumnDiv className="w-full gap-6">
          <DataTable
            className="rounded-lg overflow-clip"
            globalFilterFields={['name', 'cpf', 'email']}
            header={header}
            selectionMode="single"
            value={patients.length > 0 ? patients : []}
            emptyMessage="Nenhum paciente encontrado"
            filters={filters}
            onRowClick={onRowClick}
          >
            <Column field="name" header="Nome" />
            <Column field="email" header="Email" />
            <Column field="cpf" header="CPF" />
            <Column
              field="birthDate"
              header="Data de nascimento"
            />
            <Column field="gender" header="Sexo" />
            <Column field="status" header="Status" body={renderStatus} />
          </DataTable>
        </ColumnDiv>
      </ColumnDiv>
    </ColumnDiv>
  );
};

export default Index;
