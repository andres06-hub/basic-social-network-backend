import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { IPost } from '../interfaces/data';
import { User } from 'src/models/user.entity';

export class DataPostDto {
  @IsNotEmpty({
    message: 'Title is required!',
  })
  title: string;

  @MinLength(5, {
    message: 'message is too short',
  })
  @MaxLength(255)
  message: string;

  @IsNotEmpty({
    message: 'Date is required!',
  })
  createdAt: number;

  @IsNotEmpty({
    message: 'userId is required!',
  })
  userId: number;
}

export class DataUpdateDto {
  id: number;
  title: string;
  message: string;
  updatedAt: number;
}
