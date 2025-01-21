import { IClassroom } from "./Classroom";
import { ISubject } from "./Subject";

export interface ISchedules {
  id: number;
  name: string;
  classroom_id: number;
  room: string;
  subject_id: number;
  subject:{
    name: ISubject[];
  };
  classroom: IClassroom[];
  day: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
}
