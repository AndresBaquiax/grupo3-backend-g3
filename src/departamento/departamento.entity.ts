// departamento.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Direccion } from '../direcciones/direccion.entity';

@Entity('departamento')
export class Departamento {
  @PrimaryGeneratedColumn()
  id_departamento: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Direccion, (direccion: Direccion) => direccion.departamento)
  direcciones: Direccion[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}



