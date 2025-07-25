import { Controller, Post, Body } from '@nestjs/common';
import { UsuarioService } from './register.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './register.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('registro')
  crearUsuario(@Body() dto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuarioService.crearUsuario(dto);
  }
}
