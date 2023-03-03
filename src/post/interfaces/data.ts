import { User } from 'src/models/user.entity';

export interface IPost {
  id?: number;
  title: string;
  message: string;
  createdAt: number;
  updatedAt: number;
  userId: number;
}
