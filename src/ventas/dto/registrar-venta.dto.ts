import {IsArray,IsDateString,IsNotEmpty,IsNumber,IsOptional,IsPositive,IsString,ValidateNested,} from 'class-validator';
import { Type } from 'class-transformer';

class ProductoVentaDto {
  @IsPositive()
  id_inventario: number;

  @IsPositive()
  id_lote: number;

  @IsNumber()
  @IsPositive()
  cantidad: number;

  @IsNumber()
  @IsPositive()
  precio_unitario: number;
}

export class RegistrarVentaDto {
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

  @IsPositive()
  id_direccion: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoVentaDto)
  productos: ProductoVentaDto[];
}
