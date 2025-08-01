// src/detalle-factura/dto/update-detalle-factura.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleFacturaDto } from './crear-detalle-factura.dto';
import { IsInt, IsOptional, IsPositive, IsNumber } from 'class-validator';

export class UpdateDetalleFacturaDto extends PartialType(CreateDetalleFacturaDto) {
  @IsOptional()
  @IsInt()
  @IsPositive()
  id_factura?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  id_inventario?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  id_lote?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  precio_unitario?: number;
}
