import {Injectable,NotFoundException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './factura.entity';
import { CreateFacturaDto } from './dto/crear-factura.dto';
import { UpdateFacturaDto } from './dto/actualizar-factura.dto';
import { Proveedor } from 'src/proveedor/proveedor.entity';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepo: Repository<Factura>,
    @InjectRepository(Proveedor)
    private readonly proveedorRepo: Repository<Proveedor>,
  ) {}

  async crear(dto: CreateFacturaDto): Promise<Factura> {
    const proveedor = await this.proveedorRepo.findOne({
      where: { id_proveedor: dto.id_proveedor },
    });
    if (!proveedor) {
      throw new NotFoundException('Proveedor no encontrado');
    }

    const factura = this.facturaRepo.create({
      tipo: dto.tipo,
      fecha: dto.fecha as any,
      subtotal: dto.subtotal.toFixed(2),
      total: dto.total.toFixed(2),
      descuento: dto.descuento != null ? dto.descuento.toFixed(2) : null,
      estado: dto.estado,
      proveedor,
    });

    return this.facturaRepo.save(factura);
  }

  async obtenerTodos(): Promise<Factura[]> {
    return this.facturaRepo.find({
      relations: ['proveedor'],
      order: { id_factura: 'DESC' },
    });
  }

  async obtenerPorId(id: number): Promise<Factura> {
    const factura = await this.facturaRepo.findOne({
      where: { id_factura: id },
      relations: ['proveedor'],
    });
    if (!factura) {
      throw new NotFoundException('Factura no encontrada');
    }
    return factura;
  }

  async actualizar(id: number, dto: UpdateFacturaDto): Promise<Factura> {
    const factura = await this.obtenerPorId(id);

    if (dto.id_proveedor) {
      const proveedor = await this.proveedorRepo.findOne({
        where: { id_proveedor: dto.id_proveedor },
      });
      if (!proveedor) throw new NotFoundException('Proveedor no encontrado');
      factura.proveedor = proveedor;
    }

    if (dto.tipo !== undefined) factura.tipo = dto.tipo;
    if (dto.fecha !== undefined) factura.fecha = dto.fecha as any;
    if (dto.subtotal !== undefined)
      factura.subtotal = dto.subtotal.toFixed(2);
    if (dto.total !== undefined) factura.total = dto.total.toFixed(2);
    if (dto.descuento !== undefined)
      factura.descuento =
        dto.descuento != null ? dto.descuento.toFixed(2) : null;
    if (dto.estado !== undefined) factura.estado = dto.estado;

    return this.facturaRepo.save(factura);
  }

  async eliminarLogico(id: number): Promise<Factura> {
    const factura = await this.obtenerPorId(id);
    factura.estado = false;
    return this.facturaRepo.save(factura);
  }
}
