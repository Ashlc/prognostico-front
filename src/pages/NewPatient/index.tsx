import ColumnDiv from '@/components/Column';
import Row from '@/components/Row';
import Section from '@/components/Section';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { api } from '../../services/api';
import { Save } from 'lucide-react';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';

// Definição das interfaces
interface PathologicalData {
    albumin: string;
    ascites: string;
    diff_diag: string;
    encephalopathy: string;
    inr: string;
    total_bilirubin: string;
}

interface formValues {
    birthDate: string;
    cpf: string;
    email: string;
    gender: string;
    name: string;
    pathological_data: PathologicalData;
    status: boolean;
    type: string;
}

const Index = () => {

    const navigate = useNavigate();
    const toast = useRef<Toast>(null);

    const [formValues, setFormValues] = useState<formValues>({
        birthDate: '',
        cpf: '',
        email: '',
        gender: '',
        name: '',
        pathological_data: {
            albumin: '',
            ascites: '',
            diff_diag: '',
            encephalopathy: '',
            inr: '',
            total_bilirubin: '',
        },
        status: false,
        type: 'patient',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handlePathologicalChange = (field: string, value: string) => {
        setFormValues(prev => ({
            ...prev,
            pathological_data: {
                ...prev.pathological_data,
                [field]: value
            }
        }));
    };

    function submit() {
        if (formValues) {
            const dataToSubmit = {
                ...formValues,
                status: formValues.status === true,
                pathological_data: {
                    ...formValues.pathological_data,
                    inr: Number(formValues.pathological_data.inr),
                    total_bilirubin: Number(formValues.pathological_data.total_bilirubin),
                    albumin: Number(formValues.pathological_data.albumin)
                }
            };
            api.post({ url: `/users`, data: dataToSubmit })
                .then(() => {
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Paciente cadastrado com sucesso',
                        life: 3000
                    });
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                })
                .catch((error) => {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Erro',
                        detail: 'Erro ao cadastrar paciente',
                        life: 3000
                    });
                    console.error('Error:', error);
                });
        }
    }

    return (
        <ColumnDiv>
            <Toast ref={toast} />
            <form id="form">
                <ColumnDiv className="w-11/12 mx-auto py-10 gap-6">
                    <Section header="Dados pessoais">
                        <Row className="justify-between items-center pb-4 gap-4">
                            <div className="flex flex-col grow">
                                <label htmlFor="name">Nome</label>
                                <InputText
                                    id="name"
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-col grow-0">
                                <label htmlFor="birthDate">Data de nascimento</label>
                                <InputText 
                                    id="birthDate"
                                    className='text-center w-[10rem]'
                                    name='birthDate'
                                    value={formValues.birthDate}
                                    onChange={handleChange}
                                />
                            </div>
                        </Row>

                        <Row className="justify-between items-center pb-4 gap-4">
                            <div className="flex flex-col grow">
                                <label htmlFor="cpf">CPF</label>
                                <InputText 
                                    id="cpf"
                                    name='cpf'
                                    value={formValues.cpf}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-col grow">
                                <label htmlFor="email">Email</label>
                                <InputText
                                    id="email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-col grow">
                                <label htmlFor="status">Status</label>
                                <Dropdown
                                    id="status"
                                    name="status"
                                    value={formValues.status} 
                                    onChange={(e) => setFormValues(prev => ({ ...prev, status: e.value }))}
                                    options={[
                                        { name: 'Ativo', value: 'true' }, 
                                        { name: 'Inativo', value: 'false' }
                                    ]} 
                                    optionLabel="name"
                                    className="w-full"
                                />
                            </div>

                            <div className="flex flex-col w-[5rem]">
                                <label htmlFor="gender">Sexo</label>
                                <Dropdown 
                                    id="gender"
                                    name="gender"
                                    value={formValues.gender} 
                                    onChange={(e) => setFormValues(prev => ({ ...prev, gender: e.value }))}
                                    options={[
                                        { name: 'M', value: 'M' }, 
                                        { name: 'F', value: 'F' }
                                    ]} 
                                    optionLabel="name"
                                    className="w-full"
                                />
                            </div>
                        </Row>
                    </Section>

                    <Section header="Informações patológicas">
                        <ColumnDiv className='gap-4'>
                            <Row className="col-span-2 flex flex-row gap-4">
                                <div className="flex flex-col grow">
                                    <label htmlFor="diff_diag">Diagnóstico diferencial</label>
                                    <InputText
                                        id="diff_diag"
                                        name="diff_diag"
                                        value={formValues.pathological_data.diff_diag}
                                        onChange={(e) => handlePathologicalChange(e.target.name, e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col grow">
                                    <label htmlFor="inr">INR</label>
                                    <InputText
                                        id="inr"
                                        name="inr"
                                        value={formValues.pathological_data.inr}
                                        onChange={(e) => handlePathologicalChange(e.target.name, e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col grow">
                                    <label htmlFor="albumin">Albumina</label>
                                    <InputText
                                        id="albumin"
                                        name="albumin"
                                        value={formValues.pathological_data.albumin}
                                        onChange={(e) => handlePathologicalChange(e.target.name, e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col grow">
                                    <label htmlFor="ascites">Ascite</label>
                                    <InputText
                                        id="ascites"
                                        name="ascites"
                                        value={formValues.pathological_data.ascites}
                                        onChange={(e) => handlePathologicalChange(e.target.name, e.target.value)}
                                    />
                                </div>
                            </Row>

                            <Row className="col-span-2 flex flex-row gap-4">
                                <div className="flex flex-col grow">
                                    <label htmlFor="total_bilirubin">Bilirrubina</label>
                                    <InputText
                                        id="total_bilirubin"
                                        name="total_bilirubin"
                                        value={formValues.pathological_data.total_bilirubin}
                                        onChange={(e) => handlePathologicalChange(e.target.name, e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col grow">
                                    <label htmlFor="encephalopathy">Encefalopatia</label>
                                    <InputText
                                        id="encephalopathy"
                                        name="encephalopathy"
                                        value={formValues.pathological_data.encephalopathy}
                                        onChange={(e) => handlePathologicalChange(e.target.name, e.target.value)}
                                    />
                                </div>
                            </Row>
                        </ColumnDiv>
                    </Section>
                    <div className='flex justify-end'>
                        <Button 
                            type='submit' 
                            className="flex gap-2" 
                            icon={<Save size={18} />} 
                            onClick={(e) => { 
                                e.preventDefault();
                                submit(); 
                            }}
                        >
                            Salvar
                        </Button>
                    </div>
                </ColumnDiv>
            </form>
        </ColumnDiv>
    );

}

export default Index;
