import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { VentasService } from './ventas.service';
import { RegistrarVentaDto } from './dto/registrar-venta.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Ventas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una venta' })
  @ApiResponse({ status: 201, description: 'Venta registrada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o error en la venta' })
  async registrarVenta(
    @Body() dto: RegistrarVentaDto,
    @Req() req: any,
  ) {
    const id_usuario = req.user.id_usuario;
    return this.ventasService.registrarVenta(dto, id_usuario);
  }
}
