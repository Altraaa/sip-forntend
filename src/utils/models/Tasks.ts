import { IStudent } from "./Student";
import { ISubject } from "./Subject";
import { ITeacher } from "./Teacher";

export interface ITask {
  id: number;
  title: string;
  description: string;
  student_id: number;
  student: IStudent[];
  subject_id: number;
  subject: ISubject;
  teacher: ITeacher[];
  due_date: string;
  created_at: string;
  updated_at: string;
}
