import {Controller,Post,Body,UseGuards,Req} from '@nestjs/common';
import { ComprasService } from './compras.service';
import { RegistrarCompraDto } from './dto/registrar-compra.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Compras')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar compra' })
  @ApiResponse({ status: 201, description: 'Compra registrada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async registrarCompra(
    @Body() dto: RegistrarCompraDto,
    @Req() req: Request,
  ) {
    const usuario = req.user as { id_usuario: number; rol: string };
    return this.comprasService.registrarCompra(dto, usuario.id_usuario);
  }
}