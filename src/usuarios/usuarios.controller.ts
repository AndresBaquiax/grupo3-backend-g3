import {Controller,Post,Get,Patch,Delete,Param,Body,UseGuards,ParseIntPipe,} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UsuariosService } from './usuarios.service';
import { CreateUsuariosDto } from './dto/crear-usuarios.dto';
import { UpdateUsuariosDto } from './dto/actualizar-usuarios.dto';

@UseGuards(JwtAuthGuard)
@Controller('usuarios-factura')
export class UsuariosController {
  constructor(private readonly service: UsuariosService) {}

  @Post()
  crear(@Body() dto: CreateUsuariosDto) {
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
    @Body() dto: UpdateUsuariosDto,
  ) {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.service.eliminar(id);
  }
}
