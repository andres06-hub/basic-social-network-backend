import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class DataLoginDto {
  @IsNotEmpty({
    message: 'Requiered Email',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(25)
  password: string;
}
