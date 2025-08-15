import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Direccion } from './direccion.entity';
import { Departamento } from '../departamento/departamento.entity';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';

@Injectable()
export class DireccionService {
  constructor(
    @InjectRepository(Direccion)
    private readonly direccionRepo: Repository<Direccion>,
    @InjectRepository(Departamento)
    private readonly departamentoRepo: Repository<Departamento>,
  ) {}

  async create(dto: CreateDireccionDto) {
    // Validar que el departamento existe antes de crear la dirección
    if (dto.id_departamento) {
      const departamento = await this.departamentoRepo.findOne({
        where: { id_departamento: dto.id_departamento }
      });
      
      if (!departamento) {
        throw new NotFoundException(
          `No existe un departamento con el ID ${dto.id_departamento}`
        );
      }
    }

    const direccion = this.direccionRepo.create({
      ...dto,
      // Solo asignar el departamento si se proporciona el ID
      ...(dto.id_departamento && { 
        departamento: { id_departamento: dto.id_departamento } 
      }),
    });
    
    try {
      return await this.direccionRepo.save(direccion);
    } catch (error) {
      // Manejo específico de errores de clave foránea
      if (error.code === '23503') {
        throw new BadRequestException(
          `Error de integridad: No existe un departamento con el ID ${dto.id_departamento}`
        );
      }
      // Re-lanzar otros errores
      throw error;
    }
  }

  async findAll() {
    return this.direccionRepo.find({
      relations: ['departamento'], // Incluir la relación con departamento
      where: { estado: true } // Solo direcciones activas
    });
  }

  async findOne(id: number) {
    const direccion = await this.direccionRepo.findOne({
      where: { id_direccion: id },
      relations: ['departamento']
    });
    
    if (!direccion) {
      throw new NotFoundException(`Dirección con ID ${id} no encontrada`);
    }
    
    return direccion;
  }

  async update(id: number, dto: UpdateDireccionDto) {
    // Validar que la dirección existe
    const direccionExistente = await this.findOne(id);
    
    // Si se está actualizando el departamento, validar que existe
    if (dto.id_departamento && dto.id_departamento !== direccionExistente.departamento?.id_departamento) {
      const departamento = await this.departamentoRepo.findOne({
        where: { id_departamento: dto.id_departamento }
      });
      
      if (!departamento) {
        throw new NotFoundException(
          `No existe un departamento con el ID ${dto.id_departamento}`
        );
      }
    }

    try {
      // Actualizar la dirección
      await this.direccionRepo.update(id, {
        ...dto,
        ...(dto.id_departamento && { 
          departamento: { id_departamento: dto.id_departamento } 
        }),
      });
      
      // Retornar la dirección actualizada
      return this.findOne(id);
    } catch (error) {
      if (error.code === '23503') {
        throw new BadRequestException(
          `Error de integridad: No existe un departamento con el ID ${dto.id_departamento}`
        );
      }
      throw error;
    }
  }

  async remove(id: number) {
    const direccion = await this.findOne(id);
    
    // Soft delete - cambiar estado a false en lugar de eliminar físicamente
    direccion.estado = false;
    return this.direccionRepo.save(direccion);
    
    // Si quieres eliminar físicamente, usa:
    // return this.direccionRepo.remove(direccion);
  }

  // Método adicional para validar departamentos
  async validateDepartamento(id_departamento: number): Promise<boolean> {
    if (!id_departamento) return true; // Si es nullable, permitir null
    
    const count = await this.departamentoRepo.count({
      where: { id_departamento }
    });
    
    return count > 0;
  }

  // Método para obtener direcciones por departamento
  async findByDepartamento(id_departamento: number) {
    return this.direccionRepo.find({
      where: { 
        departamento: { id_departamento },
        estado: true 
      },
      relations: ['departamento']
    });
  }
}