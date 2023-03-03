import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class DataPostDto {
  @IsNotEmpty()
  title: string;

  @MinLength(50)
  @MaxLength(255)
  message: string;
}
