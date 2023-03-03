import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class DataPostDto {
  @IsNotEmpty({
    message: 'Title is required!',
  })
  title: string;

  @MinLength(50, {
    message: 'message is too Length',
  })
  @MaxLength(255)
  message: string;

  @IsNotEmpty({
    message: 'Date is required!',
  })
  craeteAt: number;

  @IsNotEmpty({
    message: 'userId is required!',
  })
  userId: number;
}
