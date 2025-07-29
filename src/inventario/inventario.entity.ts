// src/inventario/inventario.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Producto } from 'src/producto/producto.entity';

@Entity('inventario')
export class Inventario {
  @PrimaryGeneratedColumn()
  id_inventario: number;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  @ManyToOne(() => Producto, (producto) => producto.inventarios, { nullable: false })
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
