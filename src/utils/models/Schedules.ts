import { IClassroom } from "./Classroom";
import { ISubject } from "./Subject";
import { ITeacher } from "./Teacher";

export interface ISchedules {
  id: number;
  name: string;
  classroom_id: number;
  room: string;
  subject_id: number;
  subject: ISubject;
  classroom: IClassroom[];
  teacher_id: number;
  teacher: ITeacher;
  day: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
}
