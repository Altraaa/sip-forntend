export interface IStudent {
  id: number;
  nis: number;
  name: string;
  user_id: number;
  classroom_id: number;
  attendance_number: number;
  phone_number: number;
  profile_picture: File | string;
  description: string;
  created_at: string;
  updated_at: string;
}