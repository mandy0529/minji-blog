import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';

export enum RoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class SignupDto {
  // email
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // password
  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'password must be at least 8 characters',
  })
  password: string;

  // name
  @IsString()
  @IsOptional()
  name?: string;

  // role
  @IsEnum(RoleEnum)
  role;
}
