import ColumnDiv from '@/components/Column';
import Row from '@/components/Row';
import Section from '@/components/Section';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { api } from '../../services/api';
import { Save } from 'lucide-react';

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
    [key: string]: any; // Adicionada assinatura de índice
    birthDate: string;
    cpf: string;
    email: string;
    gender: string;
    humanized_prognosis: string;
    id: number;
    name: string;
    pathological_data: PathologicalData[];
    status: string;
    type: string;
}

const Index = () => {

    const [formValues, setFormValues] = useState<formValues>({
        birthDate: '',
        cpf: '',
        email: '',
        gender: '',
        humanized_prognosis: '',
        id: 0,
        name: '',
        pathological_data: [{
            albumin: '',
            ascites: '',
            diff_diag: '',
            encephalopathy: '',
            inr: '',
            total_bilirubin: '',
        }],
        status: '',
        type: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const newForm = { ...formValues, [name]: value };
        setFormValues(newForm);
    };

    const handlePathologicalChange = (index: number, field: string, value: string) => {
        const updatedPathologicalData = formValues.pathological_data.map((data, i) => 
            i === index ? { ...data, [field]: value } : data
        );
        setFormValues({ ...formValues, pathological_data: updatedPathologicalData });
    };

    function submit() {
        if (formValues) {
            console.log(typeof(formValues));
            api.post({ url: `/users/`, data: formValues });
        } else {
            console.error('Patient data is null, cannot submit.');
        }
    }

    return (
        <ColumnDiv>
            {/*onSubmit={submit}*/}
            <form id="form" >
                <ColumnDiv className="w-11/12 mx-auto py-10 gap-6">
                    <Section header="Dados pessoais" >
                        <Row className="justify-between items-center pb-4 gap-4">
                            <div className="flex flex-col grow">
                                <label htmlFor="username">Nome</label>
                                <InputText
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-col grow-0">
                                <label htmlFor="birthDate">Data de nascimento</label>
                                <InputText 
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
                                    name='cpf'
                                    value={formValues.cpf}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-col grow ">
                                <label htmlFor="email">Email</label>
                                <InputText
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-col grow ">
                                <label htmlFor="type">Tipo</label>
                                <InputText
                                    name="type"
                                    value={formValues.type}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-col grow ">
                                <label htmlFor="status">Status</label>
                                <Dropdown
                                    name="status"
                                    value={formValues.status} 
                                    onChange={(e) => setFormValues({ ...formValues, status: e.value })}
                                    options={[{ name: 'true' }, { name: 'false' }]} 
                                    optionLabel="name" 
                                    className="w-full "
                                />
                            </div>

                            <div className="flex flex-col w-[5rem]">
                                <label htmlFor="gender">Sexo</label>

                                <Dropdown 
                                    name="gender"
                                    value={formValues.gender} 
                                    onChange={(e) => setFormValues({ ...formValues, gender: e.value })}
                                    options={[{ name: 'M' }, { name: 'F' }]} 
                                    optionLabel="name" 
                                    className="w-full " 
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
                                        name="diff_diag"
                                        value={formValues.pathological_data[0].diff_diag}
                                        onChange={(e) => handlePathologicalChange(0, e.target.name, e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col grow">
                                    <label htmlFor="inr">INR</label>
                                    <InputText
                                        name="inr"
                                        value={formValues.pathological_data[0].inr}
                                        onChange={(e) => handlePathologicalChange(0, e.target.name, e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col grow">
                                    <label htmlFor="albumin">Albumina</label>
                                    <InputText
                                        name="albumin"
                                        value={formValues.pathological_data[0].albumin}
                                        onChange={(e) => handlePathologicalChange(0, e.target.name, e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col grow">
                                    <label htmlFor="ascites">Ascite</label>
                                    <InputText
                                        name="ascites"
                                        value={formValues.pathological_data[0].ascites}
                                        onChange={(e) => handlePathologicalChange(0, e.target.name, e.target.value)}
                                    />
                                </div>
                            </Row>

                            <Row className="col-span-2 flex flex-row gap-4">

                                <div className="flex flex-col grow">
                                    <label htmlFor="total_bilirubin">Bilirrubina</label>
                                    <InputText
                                        name="total_bilirubin"
                                        value={formValues.pathological_data[0].total_bilirubin}
                                        onChange={(e) => handlePathologicalChange(0, e.target.name, e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col grow">
                                    <label htmlFor="encephalopathy">Encefalopatia</label>
                                    <InputText
                                        name="encephalopathy"
                                        value={formValues.pathological_data[0].encephalopathy}
                                        onChange={(e) => handlePathologicalChange(0, e.target.name, e.target.value)}
                                    />
                                </div>
                                
                            </Row>
                        </ColumnDiv>
                    </Section>
                </ColumnDiv>
                <div className='flex justify-center'>
                    <Button type='submit' icon={<Save size={18} />} onClick={(e) => { 
                        e.preventDefault(); // Previne o comportamento padrão de submissão do formulário
                        submit(); 
                    }}>Salvar</Button>
                </div>
            </form>
        </ColumnDiv>
    );

}

export default Index;
