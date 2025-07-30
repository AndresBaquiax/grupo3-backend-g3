import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Producto } from 'src/productos/productos.entity';

@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
