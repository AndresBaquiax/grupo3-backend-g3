import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  contrasena!: string;

  @IsNotEmpty()
  @IsString()
  telefono!: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsEmail()
  @IsNotEmpty()
  correo!: string;

  @IsNotEmpty()
  @IsNumber()
  id_rol!: number;
}