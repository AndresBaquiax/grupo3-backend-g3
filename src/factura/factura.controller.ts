import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/crear-factura.dto';
import { UpdateFacturaDto } from './dto/actualizar-factura.dto';

@UseGuards(JwtAuthGuard)
@Controller('facturas')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @Post()
  crear(@Body() dto: CreateFacturaDto) {
    return this.facturaService.crearFactura(dto);
  }

  @Get()
  obtenerTodos() {
    return this.facturaService.obtenerTodasLasFacturas();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.facturaService.obtenerPorIdFactura(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFacturaDto,
  ) {
    return this.facturaService.actualizarFacturaPorId(id, dto);
  }

  @Patch('eliminar/:id')
  eliminarLogico(@Param('id', ParseIntPipe) id: number) {
    return this.facturaService.eliminarLogicoFacturaPorId(id);
  }
}
