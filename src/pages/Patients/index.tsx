import ColumnDiv from '@/components/Column';
import InputGroup from '@/components/InputGroup';
import Row from '@/components/Row';
import Section from '@/components/Section';
import { mockPatients } from '@/services/mock';
import { WandSparkles } from 'lucide-react';
import { Dropdown } from 'primereact/dropdown';

const index = () => {
  const patientId = window.location.href.split('/').pop();
  const patient = mockPatients[parseInt(patientId || '0')];
  console.log(patient);
  return (
    <ColumnDiv className="w-11/12 mx-auto py-10 gap-10">
      <Section header="Dados pessoais">
        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-5">
            <InputGroup label="Nome" value={patient?.name} readOnly />
          </div>
          <div className="col-span-1">
            <InputGroup label="CPF" value={patient?.cpf} readOnly />
          </div>
          <div className="col-span-1">
            <InputGroup
              label="Data de nascimento"
              value={patient?.birthDate}
              readOnly
            />
          </div>
          <div className="col-span-1">
            <InputGroup label="Sexo" value={patient?.sex} readOnly />
          </div>
        </div>
      </Section>
      {patient?.prognostic && (
        <Section header="Prognóstico">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-5">
              <div className="flex flex-row gap-3 border p-4 rounded-lg">
                <WandSparkles size={22} className="text-primary-600" />
                <p>{patient?.prognostic?.comment}</p>
              </div>
            </div>
            <div className="col-span-1 shadow-none border flex flex-col pt-5 px-4 justify-center h-28 rounded-lg relative">
              <p className="absolute top-3 left-4 text-sm text-slate-500">
                Classificação (Child-Pugh)
              </p>
              <p className="text-4xl font-bold text-primary-600">
                {patient?.prognostic?.classification}
              </p>
            </div>
            <div className="col-span-1 shadow-none border flex flex-col pt-5 px-4 justify-center h-28 rounded-lg relative">
              <p className="absolute top-3 left-4 text-sm text-slate-500">
                Pontuação
              </p>
              <Row className="items-end">
                <p className="text-4xl font-bold text-primary-600">
                  {patient?.prognostic?.points}
                </p>
                <p className="text-slate-400">/40</p>
              </Row>
            </div>
            <div className="col-span-1 shadow-none border flex flex-col pt-5 px-4 justify-center h-28 rounded-lg relative">
              <p className="absolute top-3 left-4 text-sm text-slate-500">
                Sobrevida em 1 ano
              </p>
              <p className="text-4xl font-bold text-primary-600">
                {patient?.prognostic?.inOneYear * 100}%
              </p>
            </div>
            <div className="col-span-1 shadow-none border flex flex-col pt-5 px-4 justify-center h-28 rounded-lg relative">
              <p className="absolute top-3 left-4 text-sm text-slate-500">
                Sobrevida em 2 anos
              </p>
              <p className="text-4xl font-bold text-primary-600">
                {patient?.prognostic?.inTwoYears * 100}%
              </p>
            </div>
            <div className="col-span-1 shadow-none border flex flex-col pt-5 px-4 justify-center h-28 rounded-lg relative">
              <p className="absolute top-3 left-4 text-sm text-slate-500">
                Sobrevida em 1 ano
              </p>
              <p className="text-4xl font-bold text-primary-600">
                {patient?.prognostic?.mortality * 100}%
              </p>
            </div>
          </div>
        </Section>
      )}
      <Section header="Informações patológicas">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2 flex flex-row gap-4">
            <InputGroup
              label="Diagnóstico diferencial"
              value={patient?.pathology?.diagnostic}
              readOnly
            />
            <InputGroup
              label="CID"
              value={patient?.pathology?.cid}
              className="w-1"
              readOnly
            />
          </div>
          <div className="col-span-3">
            <InputGroup
              label="Comentários"
              value={patient?.pathology?.comments}
              readOnly
            />
          </div>
          <InputGroup
            label="Albumina"
            value={patient?.pathology?.albumin.toString()}
            readOnly
          />
          <div className="flex flex-col gap-1 grow">
            <p className="text-slate-600 text-sm">Ascite</p>
            <Dropdown
              value={patient?.pathology?.ascites}
              options={[
                { label: 'Ausente', value: 'none' },
                { label: 'Pequena', value: 'small' },
                { label: 'Volumosa', value: 'large' },
              ]}
              readOnly
              className="grow"
            />
          </div>

          <InputGroup
            label="Bilirrubina"
            value={patient?.pathology?.bilirubin.toString()}
            readOnly
          />
          <div className="flex flex-col gap-1 grow">
            <p className="text-slate-600 text-sm">Encefalopatia</p>
            <Dropdown
              value={patient?.pathology?.encefalopathy}
              options={[
                { label: 'Ausente', value: 'none' },
                { label: 'Graus I e II', value: '1-2' },
                { label: 'Graus III e IV', value: '3-4' },
              ]}
              readOnly
              className="grow"
            />
          </div>
          <InputGroup
            label="INR"
            value={patient?.pathology?.inr.toString()}
            readOnly
          />
        </div>
      </Section>
    </ColumnDiv>
  );
};

export default index;
