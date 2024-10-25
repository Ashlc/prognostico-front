export interface IPathology {
  diagnostic: string;
  cid: string;
  comments: string;
  encefalopathy: 'none' | '1-2' | '3-4';
  ascites: 'none' | 'small' | 'large';
  inr: number;
  bilirubin: number;
  albumin: number;
}
