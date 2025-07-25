import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nombre: string;

  @IsString()
  contrasena: string;

  @IsString()
  telefono: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsEmail()
  correo: string;

  @IsBoolean()
  estado: boolean;

  @IsOptional()
  fecha_creacion?: Date;

  @IsString()
  id_rol: number;
}
