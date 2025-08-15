// departamento.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departamento } from './departamento.entity';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepo: Repository<Departamento>,
  ) {}

  async create(dto: CreateDepartamentoDto) {
    if (!dto.nombre || dto.nombre.trim() === '' || dto.nombre.toLowerCase() === 'sin nombre') {
      throw new BadRequestException('Debe proporcionar un nombre válido para el departamento');
    }
    
    const departamento = this.departamentoRepo.create({
      ...dto,
      nombre: dto.nombre.trim()
    });
    
    return this.departamentoRepo.save(departamento);
  }

  async findAll() {
    return this.departamentoRepo.find({
      where: { estado: true },
      relations: ['direcciones'],
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: number) {
    const departamento = await this.departamentoRepo.findOne({
      where: { id_departamento: id },
      relations: ['direcciones'],
    });
    
    if (!departamento) {
      throw new NotFoundException(`Departamento con ID ${id} no encontrado`);
    }
    
    return departamento;
  }

  async update(id: number, dto: UpdateDepartamentoDto) {
    await this.findOne(id); // Verificar que existe
    
    await this.departamentoRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const departamento = await this.findOne(id);
    
    // Soft delete - cambiar estado a false
    departamento.estado = false;
    return this.departamentoRepo.save(departamento);
  }
}

