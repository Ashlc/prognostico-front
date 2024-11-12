export interface IPrognostic {
  classification: 'A' | 'B' | 'C';
  points: number;
  inOneYear: number;
  inTwoYears: number;
  mortality: number;
  comment: string;
}
