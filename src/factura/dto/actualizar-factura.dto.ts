import { PartialType } from '@nestjs/mapped-types';
import { CreateFacturaDto } from './crear-factura.dto';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateFacturaDto extends PartialType(CreateFacturaDto) {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  id_proveedor?: number;
}
