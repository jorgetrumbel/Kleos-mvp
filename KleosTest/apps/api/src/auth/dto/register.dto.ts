import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { RolUsuario } from '@prisma/client';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsEnum(RolUsuario)
  role: RolUsuario;
}
