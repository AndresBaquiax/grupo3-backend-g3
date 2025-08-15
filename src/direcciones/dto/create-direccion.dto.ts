// create-direccion.dto.ts
import { IsString, IsNumber, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDireccionDto {
  @ApiProperty({
    description: 'Nombre de la calle de la dirección',
    example: 'Av. Principal 123',
  })
  @IsString()
  @IsNotEmpty()
  calle: string;

  @ApiProperty({
    description: 'Nombre de la colonia o barrio',
    example: 'Centro Histórico',
  })
  @IsString()
  @IsNotEmpty()
  colonia: string;

  @ApiProperty({
    description: 'Nombre de la ciudad',
    example: 'Guatemala City',
  })
  @IsString()
  @IsNotEmpty()
  ciudad: string;

  @ApiProperty({
    description: 'ID del usuario al que pertenece la dirección',
    example: 1,
  })
  @IsNumber()
  id_usuario: number;

  @ApiPropertyOptional({
    description: 'ID del departamento (opcional)',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  id_departamento?: number;

  @ApiPropertyOptional({
    description: 'Estado de la dirección (activo/inactivo)',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  estado?: boolean = true;
}
