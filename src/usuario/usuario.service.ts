import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async findByCorreo(correo: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({
      where: { correo },
      relations: ['rol'],
    });
  }
}
