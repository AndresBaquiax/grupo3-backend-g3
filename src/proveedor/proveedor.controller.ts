import { ProveedorService } from './proveedor.service';
import {CreateProveedorDto} from './dto/crear-proveedor.dto'
import {UpdateProveedorDto} from './dto/actualizar-proveedor.dto'
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Controller, Get, Post, Patch, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('proveedores')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @Post()
  crear(@Body() dto: CreateProveedorDto) {
    return this.proveedorService.crear(dto);
  }

  @Get()
  obtenerTodos() {
    return this.proveedorService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.proveedorService.obtenerPorId(id);
  }

  @Patch(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProveedorDto) {
    return this.proveedorService.actualizar(id, dto);
  }

  @Patch('eliminar/:id')
  eliminarLogico(@Param('id', ParseIntPipe) id: number) {
    return this.proveedorService.eliminarLogico(id);
  }
}
