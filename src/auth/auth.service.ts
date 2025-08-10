import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async login(correo: string, contrasena: string) {
    const usuario = await this.usuarioService.findByCorreo(correo);
    if (!usuario || !(await bcrypt.compare(contrasena, usuario.contrasena_hash))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: usuario.id_usuario,
      rol: usuario.rol.nombre,
    };

    return {
      token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol.nombre,
      },
    };
  }
}
