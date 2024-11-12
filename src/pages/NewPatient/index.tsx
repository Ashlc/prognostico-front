import ColumnDiv from '@/components/Column';
import Row from '@/components/Row';
import Section from '@/components/Section';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';


// Definição das interfaces
interface PathologicalData {
    albumin: string;
    ascites: string;
    diff_diag: string;
    encephalopathy: string;
    inr: string;
    total_bilirubin: string;
  }
  
  interface Prognosis {
    class: string;
    comments: string;
    one_year: number;
    perioperative_mortality: string;
    score: number;
    two_years: number;
  }

  

interface formValues {
    birthDate: string;
    cpf: string;
    email: string;
    gender: string;
    humanized_prognosis: string;
    id: number;
    name: string;
    pathological_data: PathologicalData[];
    prognosis: Prognosis[];
    status: boolean;
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
        pathological_data: [],
        prognosis: [],
        status: false,
        type: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const newForm = { ...formValues, [name]: value };
        setFormValues(newForm);
    };

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
                            <InputMask 
                            className='text-center w-[10rem]'
                                name = 'birthDate'
                                value={formValues?.birthDate}
                                onChange={handleChange}
                                mask="99/99/9999" 
                            />

                        </div>
                    </Row>

                    <Row className="justify-between items-center pb-4 gap-4">
                        <div className="flex flex-col grow">
                            <label htmlFor="cpf">CPF</label>

                            <InputMask 
                                name='cpf'
                                value={formValues?.cpf}
                                onChange={handleChange}
                                mask="999.999.999-999" 
                            />

                        </div>

                        <div className="flex flex-col grow ">
                            <label htmlFor="email">Email</label>
                            <InputText
                                name="email"
                                value={formValues?.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col w-[4rem]	">
                            <label htmlFor="gender">Sexo</label>

                            <Dropdown 
                                name="gender"
                                value={formValues?.gender} 
                                onChange={handleChange} 
                                options={[{name: 'M'}, {name: 'F'}]} 
                                optionLabel="name" 
                                className="w-full " 
                            />

                        </div>

                    </Row>

                </Section>

                <Section header="Informações patológicas">
                    <ColumnDiv className='gap-4'>
                        <Row className="col-span-2 flex flex-row gap-4">

                            <div className="flex flex-col grow ">
                                <label htmlFor="diff_diag">Diagnóstico diferencial</label>
                                <InputText
                                    name="diff_diag"
                                    value={formValues?.pathological_data[0]?.diff_diag}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const { name, value } = event.target;
                                        const updatedPathologicalData =
                                            formValues?.pathological_data.map((data, index) =>
                                            index === 0 ? { ...data, [name]: value } : data,
                                            );
                                        setFormValues({
                                            ...formValues,
                                            pathological_data: updatedPathologicalData,
                                        });
                                     }}
                                />
                            </div>

                            <div className="flex flex-col grow ">
                                <label htmlFor="inr">INR</label>
                                <InputText
                                    name="inr"
                                    value={formValues?.pathological_data[0]?.inr}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const { name, value } = event.target;
                                        const updatedPathologicalData =
                                            formValues?.pathological_data.map((data, index) =>
                                            index === 0 ? { ...data, [name]: value } : data,
                                            );
                                        setFormValues({
                                            ...formValues,
                                            pathological_data: updatedPathologicalData,
                                        });
                                    }}
                                />
                            </div>

                            <div className="flex flex-col grow ">
                                <label htmlFor="albumin">Albumina</label>
                                <InputText
                                    name="albumin"
                                    value={formValues?.pathological_data[0]?.albumin}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const { name, value } = event.target;
                                        const updatedPathologicalData = formValues?.pathological_data.map(
                                        (data, index) =>
                                            index === 0 ? { ...data, [name]: value } : data,
                                        );
                                        setFormValues({
                                        ...formValues,
                                        pathological_data: updatedPathologicalData,
                                        });
                                    }}
                                />
                            </div>

                            <div className="flex flex-col grow ">
                                <label htmlFor="albumin">Ascite</label>
                                <InputText
                                    name="ascites"
                                    value={formValues?.pathological_data[0]?.ascites}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const { name, value } = event.target;
                                        const updatedPathologicalData =
                                            formValues?.pathological_data.map((data, index) =>
                                            index === 0 ? { ...data, [name]: value } : data,
                                            );
                                        setFormValues({
                                            ...formValues,
                                            pathological_data: updatedPathologicalData,
                                        });
                                    }}
                                />
                            </div>
                        </Row>

                        <Row className="col-span-2 flex flex-row gap-4">

                            <div className="flex flex-col grow ">
                                <label htmlFor="albumin">Bilirrubina</label>
                                <InputText
                                    name="total_bilirubin"
                                    value={formValues?.pathological_data[0]?.total_bilirubin}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const { name, value } = event.target;
                                        const updatedPathologicalData = formValues?.pathological_data.map(
                                        (data, index) =>
                                            index === 0 ? { ...data, [name]: value } : data,
                                        );
                                        setFormValues({
                                        ...formValues,
                                        pathological_data: updatedPathologicalData,
                                        });
                                    }}
                                />
                            </div>
                            

                            <div className="flex flex-col grow ">
                                <label htmlFor="encephalopathy">Encefalopatia</label>
                                <InputText
                                    name="encephalopathy"
                                    value={formValues?.pathological_data[0]?.encephalopathy}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const { name, value } = event.target;
                                        const updatedPathologicalData =
                                            formValues?.pathological_data.map((data, index) =>
                                            index === 0 ? { ...data, [name]: value } : data,
                                            );
                                        setFormValues({
                                            ...formValues,
                                            pathological_data: updatedPathologicalData,
                                        });
                                    }}
                                />
                            </div>
                            
                        </Row>
                    </ColumnDiv>
                </Section>
            </ColumnDiv>
            </form>
        </ColumnDiv>

    );
}

export default Index;
