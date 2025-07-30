// src/detalle-factura/detalle-factura.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Factura } from 'src/factura/factura.entity';
import { Lote } from 'src/lote/lote.entity';
import { Inventario } from 'src/inventario/inventario.entity';

@Entity('detalle_factura')
export class DetalleFactura {
  @PrimaryGeneratedColumn()
  id_detalle: number;

  @Column({ type: 'int' })
  cantidad: number;

  @Column('numeric', { precision: 12, scale: 2 })
  precio_unitario: string;

  @ManyToOne(() => Factura, (factura) => factura.id_factura, { nullable: false })
  @JoinColumn({ name: 'id_factura' })
  factura: Factura;

  @ManyToOne(() => Inventario, (inventario) => inventario.id_inventario, {
    nullable: false,
  })
  @JoinColumn({ name: 'id_inventario' })
  inventario: Inventario;

  @ManyToOne(() => Lote, (lote) => lote.id_lote, { nullable: false })
  @JoinColumn({ name: 'id_lote' })
  lote: Lote;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
