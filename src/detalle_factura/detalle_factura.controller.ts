import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { DetalleFacturaService } from './detalle_factura.service';
import { CreateDetalleFacturaDto } from './dto/crear-detalle-factura.dto';
import { UpdateDetalleFacturaDto } from './dto/actualizar-detalle-factura.dto';

@UseGuards(JwtAuthGuard)
@Controller('detalles-factura')
export class DetalleFacturaController {
  constructor(private readonly service: DetalleFacturaService) {}

  @Post()
  crear(@Body() dto: CreateDetalleFacturaDto) {
    return this.service.crear(dto);
  }

  @Get()
  obtenerTodos() {
    return this.service.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.service.obtenerPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDetalleFacturaDto,
  ) {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.service.eliminar(id);
  }
}
