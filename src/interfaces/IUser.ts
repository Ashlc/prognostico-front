import { IPathology } from './IPathology';
import { IPrognostic } from './IPrognostic';

export interface IUser {
  id: string;
  cpf: string;
  name: string;
  email: string;
  role: 'MANAGER' | 'ADMIN' | 'PATIENT';
  status: 'ACTIVE' | 'INACTIVE';
}

export interface IPatient extends IUser {
  birthDate: string;
  sex: 'M' | 'F';
  pathology: IPathology;
  prognostic?: IPrognostic;
}
