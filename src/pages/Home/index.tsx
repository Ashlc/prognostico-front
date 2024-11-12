import ColumnDiv from '@/components/Column';
import InputGroup from '@/components/InputGroup';
import Row from '@/components/Row';
import Section from '@/components/Section';
import { IPatient } from '@/interfaces/IUser';
import { Search } from 'lucide-react';
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
import { Tag } from 'primereact/tag';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

interface PathologicalData {
  albumin: string;
  ascites: string;
  diff_diag: string;
  encephalopathy: string;
  inr: string;
  total_bilirubin: string;
}

interface User {
  birthDate: string;
  cpf: string;
  email: string;
  gender: string;
  humanized_prognosis: string;
  id: number;
  name: string;
  pathological_data: PathologicalData[];
  status: boolean;
  type: string;
}

const Index = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState<User | null>(null);
  const [visible, setVisible] = useState(false);

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

  function submit() {
    if (patient) {
    
      api.post({ url: `/users/`, data: patient });
    } else {
      console.error('Patient data is null, cannot submit.');
    }
  }

  const footerContent = (
      <div>
          <Button label="Salvar" icon="pi pi-check" onClick={() => {setVisible(false), submit()}} className="p-button-text" form='form'/>
      </div>
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
          <Button onClick={() => setVisible(true)}>Adicionar Paciente</Button>
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
    <Dialog visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
    <form id="form" onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <Section header="Dados pessoais">
          <div className="">
            <div className="col-span-5">
              <InputGroup
                label="Nome"
                name="name"
                value={patient ? patient.name : ''}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                label="CPF"
                name="cpf"
                value={patient ? patient.cpf : ''}
              />
            <div className="col-span-1">
              <InputGroup
                label="Email"
                name="email"
                value={patient ? patient.email : ''}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                label="Tipo"
                name="type"
                value={patient ? patient.type : ''}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                label="Data de nascimento"
                name="birthDate"
                value={patient ? patient.birthDate : ''}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                label="Sexo"
                name="gender"
                value={patient ? patient.gender : ''}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                label="Status"
                name="status"
                value={patient ? (patient.status == true ? 'true' : 'false') : ''}
              />
            </div>
          </div>
        </div>
        </Section>

        <Section header="Informações patológicas">
          <div className="">
            <div className="col-span-2 flex flex-row gap-4">
              <InputGroup
                label="Diagnóstico diferencial"
                name="diff_diag"
                value={patient ? patient.pathological_data[0].diff_diag : ''}
              />
              <InputGroup
                label="INR"
                name="inr"
                value={patient ? patient.pathological_data[0].inr : ''}
                className="w-2"
              />
            </div>
            <InputGroup
              label="Albumina"
              name="albumin"
              value={patient ? patient.pathological_data[0].albumin : ''}
            />
            <div className="flex flex-col gap-1 grow">
              <InputGroup
                label="Ascite"
                name="ascites"
                value={patient ? patient.pathological_data[0].ascites : ''}
              />
            </div>

            <InputGroup
              label="Bilirrubina"
              name="total_bilirubin"
              value={patient ? patient.pathological_data[0].total_bilirubin : ''}
            />
            <div className="flex flex-col gap-1 grow">
              <InputGroup
                label="Encefalopatia"
                name="encephalopathy"
                value={patient ? patient.pathological_data[0].encephalopathy : ''}
              />
            </div>
          </div>
        </Section>
      </form>
    </Dialog>
    </ColumnDiv>
  );
};

export default Index;
