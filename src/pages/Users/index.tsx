import ColumnDiv from "@/components/Column";
import Row from "@/components/Row";
import { IManager } from '@/interfaces/IUser';
import { MockManagers } from '@/services/mock';
import { Search } from 'lucide-react';
import { FilterMatchMode } from 'primereact/api'
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import {
    DataTable,
    DataTableFilterMeta,
  } from 'primereact/datatable';
  import { IconField } from 'primereact/iconfield';
  import { Dropdown } from 'primereact/dropdown';
  import { InputIcon } from 'primereact/inputicon';
  import { InputText } from 'primereact/inputtext';
  
  import { useNavigate } from 'react-router-dom';
  import { useState } from "react";

  import { ArrowLeft, Plus  } from 'lucide-react';

const Index = () => {
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const [positionFilter, setPositionFilter] = useState(null);

    const navigate = useNavigate();
    
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const _filters = { ...filters };
    
        _filters['global'].value = value;
    
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const header = (
        <Row className=" justify-between gap-2">
            <IconField iconPosition="left" className="w-full flex-grow">
                <InputIcon>
                <Search size={16} />
                </InputIcon>
                <InputText
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
                placeholder="Pesquisar usuário"
                className="w-full"
                />
            </IconField>

            <Dropdown 
            value={positionFilter} 
            onChange={(e) => setPositionFilter(e.value)} 
            options={MockManagers} 
            showClear 
            optionLabel="position" 
            placeholder="Cargo" 
            className="md:w-3/12 " 
            />
        </Row>
    );

    return (
        <ColumnDiv className="w-11/12 mx-auto py-10 gap-6">
            <Row className="justify-between items-center pb-4 border-b">
                <Row className="items-center gap-2">
                    <Button
                        icon={<ArrowLeft size={18} />}
                        aria-label="Voltar"
                        rounded
                        text
                        severity="secondary"
                        className="w-8 h-8 !aspect-square border-none"
                        onClick={() => navigate(-1)}
                    />
                    <p className="text-2xl font-bold text-primary-600 ">GESTÃO DE USUÁRIOS</p>
                </Row>
                <Button label="Adicionar Usuário" icon={<Plus size={18} className="mr-2" />} />
            </Row>

            <ColumnDiv className="w-full gap-6">
                <DataTable
                    className="rounded-lg overflow-clip"
                    globalFilterFields={['cpf', 'name', 'email', 'position', 'actions']}
                    header={header}
                    selectionMode="single"
                    value={MockManagers}
                    emptyMessage="Nenhum Usuário encontrado"
                    filters={filters}
                >
                    <Column field="cpf" header="CPF" />
                    <Column field="name" header="Nome" />
                    <Column field="email" header="Email" />
                    <Column field="position" header="Cargo"/>
                    <Column field="actions" header="Ações" />
                </DataTable>
            </ColumnDiv>
        </ColumnDiv>
    );

};

export default Index;