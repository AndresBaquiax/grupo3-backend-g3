import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateFacturaDto {
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsDateString()
  fecha: string;

  @IsNumber()
  @IsPositive()
  subtotal: number;

  @IsNumber()
  @IsPositive()
  total: number;

  @IsOptional()
  @IsNumber()
  descuento?: number;

  @IsBoolean()
  estado: boolean;

  @IsNumber()
  @IsPositive()
  id_proveedor: number;
}
