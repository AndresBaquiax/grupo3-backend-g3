import { PartialType } from '@nestjs/mapped-types';
import { CreateProveedorDto } from './crear-proveedor.dto';

export class UpdateProveedorDto extends PartialType(CreateProveedorDto) {}
