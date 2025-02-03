import { ISubject } from "./Subject";

export interface ITeacher {
  id: number;
  nip: string;
  name: string;
  subject: {
    name: ISubject;
  };
  created_at: string;
  updated_at: string;
}
