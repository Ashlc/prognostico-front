import ColumnDiv from '@/components/Column';
import InputGroup from '@/components/InputGroup';
import Row from '@/components/Row';
import Section from '@/components/Section';
import { ArrowLeft, Edit, WandSparkles, Save } from 'lucide-react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

// Definição das interfaces
interface PathologicalData {
  albumin: number;
  ascites: string;
  diff_diag: string;
  encephalopathy: string;
  inr: number;
  total_bilirubin: number;
}

interface Prognosis {
  class: string;
  comments: string;
  one_year: number;
  perioperative_mortality: string;
  score: number;
  two_years: number;
}

interface Patient {
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

const Index = () => { // Renomeei para "Index" com letra maiúscula
  const patientId = window.location.href.split('/').pop();
  const navigate = useNavigate();

  const [editPacient, setEditPacient] = useState(true);
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get({ url: `/users/${patientId}` }) as Patient;
        setPatient(response);
        console.log(response);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPatients();
  }, [patientId]);

  if (!patient) {
    return <div>Carregando...</div>;
  }

  console.log(patient.prognosis[0]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newForm = { ...patient, [name]: value };
    setPatient(newForm);
  };

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
          <p className="text-2xl font-bold text-primary-600">PACIENTE</p>
        </Row>

        {
          editPacient ? 
          <Button 
            label="Editar" 
            icon={<Edit size={18} />}
            className="mr-2" 
            onClick={() => setEditPacient(prev => !prev)}
          />
          :
            <Button 
              label="Salvar" 
              icon={<Save size={18} />}
              className="mr-2" 
              onClick={() => setEditPacient(prev => !prev)}
            />
        }
      </Row>
      
      <Section header="Dados pessoais">
        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-5">
            <InputGroup label="Nome" name="name" value={patient?.name} readOnly={editPacient} handleChange={handleChange} />
          </div>
          <div className="col-span-1">
            <InputGroup label="CPF" name="cpf" value={patient?.cpf} readOnly={editPacient} handleChange={handleChange} />
          </div>
          <div className="col-span-1">
            <InputGroup
              label="Data de nascimento"
              name="birthDate"
              value={new Date(patient?.birthDate).toLocaleDateString()}
              readOnly={editPacient}
              handleChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <InputGroup label="Sexo" name="gender" value={patient?.gender} readOnly={editPacient} handleChange={handleChange} />
          </div>
        </div>
      </Section>
      
      {patient.prognosis && patient.prognosis.length > 0 && (
        <Section header="Prognóstico">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-5">
              <div className="flex flex-row gap-3 border p-4 rounded-lg">
                <WandSparkles size={22} className="text-primary-600" />
                <p>{patient.prognosis[0]?.comments}</p>
              </div>
            </div>
            <div className="col-span-1 shadow-none border flex flex-col pt-5 px-4 justify-center h-28 rounded-lg relative">
              <p className="absolute top-3 left-4 text-sm text-slate-500">
                Classificação (Child-Pugh)
              </p>
              <p className="text-4xl font-bold text-primary-600">
                {patient.prognosis[0]?.class}
              </p>
            </div>
            <div className="col-span-1 shadow-none border flex flex-col pt-5 px-4 justify-center h-28 rounded-lg relative">
              <p className="absolute top-3 left-4 text-sm text-slate-500">
                Pontuação
              </p>
              <Row className="items-end">
                <p className="text-4xl font-bold text-primary-600">
                  {patient.prognosis[0]?.score}
                </p>
                <p className="text-slate-400">/40</p>
              </Row>
            </div>
            <div className="col-span-1 shadow-none border flex flex-col pt-5 px-4 justify-center h-28 rounded-lg relative">
              <p className="absolute top-3 left-4 text-sm text-slate-500">
                Sobrevida em 1 ano
              </p>
              <p className="text-4xl font-bold text-primary-600">
                {patient.prognosis[0]?.one_year }%
              </p>
            </div>
            <div className="col-span-1 shadow-none border flex flex-col pt-5 px-4 justify-center h-28 rounded-lg relative">
              <p className="absolute top-3 left-4 text-sm text-slate-500">
                Sobrevida em 2 anos
              </p>
              <p className="text-4xl font-bold text-primary-600">
                {patient.prognosis[0]?.two_years }%
              </p>
            </div>
            <div className="col-span-1 shadow-none border flex flex-col pt-5 px-4 justify-center h-28 rounded-lg relative">
              <p className="absolute top-3 left-4 text-sm text-slate-500">
                Taxa de mortalidade
              </p>
              <p className="text-4xl font-bold text-primary-600">
                {patient.prognosis[0]?.perioperative_mortality }%
              </p>
            </div>
          </div>
        </Section>
      )}
      
      <Section header="Informações patológicas">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-2 flex flex-row gap-4">
            <InputGroup
              label="Diagnóstico diferencial"
              value={patient?.pathological_data[0]?.diff_diag}
              readOnly
            />
            <InputGroup
              label="INR"
              value={patient?.pathological_data[0]?.inr}
              className="w-1"
              readOnly
            />
          </div>
          <InputGroup
            label="Albumina"
            value={patient?.pathological_data[0]?.albumin}
            readOnly
          />
          <div className="flex flex-col gap-1 grow">
            <p className="text-slate-600 text-sm">Ascite</p>
            <Dropdown
              value={patient?.pathological_data[0]?.ascites}
              options={[
                { label: 'Ausente', value: 'none' },
                { label: 'Pequena', value: 'small' },
                { label: 'Volumosa', value: 'large' },
              ]}
              disabled
              className="grow"
            />
          </div>

          <InputGroup
            label="Bilirrubina"
            value={patient?.pathological_data[0]?.total_bilirubin}
            readOnly
          />
          <div className="flex flex-col gap-1 grow">
            <p className="text-slate-600 text-sm">Encefalopatia</p>
            <Dropdown
              value={patient?.pathological_data[0]?.encephalopathy}
              options={[
                { label: 'Ausente', value: 'none' },
                { label: 'Graus I e II', value: '1-2' },
                { label: 'Graus III e IV', value: '3-4' },
              ]}
              disabled
              className="grow"
            />
          </div>
        </div>
      </Section>
    </ColumnDiv>
  );
};

export default Index;
