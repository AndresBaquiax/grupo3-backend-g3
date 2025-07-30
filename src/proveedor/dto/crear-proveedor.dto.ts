import { IsString, IsBoolean, MaxLength } from 'class-validator';

export class CreateProveedorDto {
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @MaxLength(20)
  telefono: string;

  @IsString()
  @MaxLength(20)
  nit: string;

  @IsBoolean()
  estado: boolean;
}
