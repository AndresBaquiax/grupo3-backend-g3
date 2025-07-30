import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateDetalleFacturaDto {
  @IsInt()
  @IsPositive()
  cantidad: number;

  @IsNumber()
  @IsPositive()
  precio_unitario: number;

  @IsInt()
  @IsPositive()
  id_factura: number;

  @IsInt()
  @IsPositive()
  id_inventario: number;

  @IsInt()
  @IsPositive()
  id_lote: number;
}
