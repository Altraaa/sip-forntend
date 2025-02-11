import { IStudent } from "./Student";
import { ISubject } from "./Subject";

export interface ITask {
  id: number;
  title: string;
  description: string;
  student_id: number;
  student: IStudent[];
  subject_id: number;
  subject: ISubject[];
  due_date: string;
  created_at: string;
  updated_at: string;
}
