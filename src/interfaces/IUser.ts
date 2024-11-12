import { IPathology } from './IPathology';
import { IPrognostic } from './IPrognostic';

export interface IUser {
  id: string;
  cpf: string;
  name: string;
  email: string;
  role: 'manager' | 'admin' | 'patient';
  status: boolean;
}

export interface IPatient extends IUser {
  birthDate: string;
  sex: 'M' | 'F';
  pathology: IPathology;
  prognostic?: IPrognostic;
}

export interface IManager extends IUser{
  position: 'Médico' | 'Gestor'
  actions: string;
}
