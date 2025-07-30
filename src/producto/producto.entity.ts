// src/producto/producto.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Categoria } from 'src/categoria/categoria.entity';
import { Inventario } from 'src/inventario/inventario.entity';

@Entity('producto')
export class Producto {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column('numeric', { precision: 10, scale: 2 })
  precio_unitario: string;

  @Column({ type: 'int' })
  stock_minimo: number;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  @Column({ type: 'text' })
  url_imagen: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos, { nullable: false })
  @JoinColumn({ name: 'id_categoria' })
  categoria: Categoria;

  @OneToMany(() => Inventario, (inventario) => inventario.producto)
  inventarios: Inventario[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
