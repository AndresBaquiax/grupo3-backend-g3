// create-departamento.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDepartamentoDto {
  @ApiProperty({
    description: 'Nombre del departamento',
    example: 'Guatemala',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiPropertyOptional({
    description: 'Estado del departamento (activo/inactivo)',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  estado?: boolean = true;
}
