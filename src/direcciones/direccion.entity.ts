import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Departamento } from '../departamento/departamento.entity';

@Entity('direccion')
export class Direccion {
  @PrimaryGeneratedColumn()
  id_direccion: number;

  @Column()
  calle: string;

  @Column()
  colonia: string;

  @Column()
  ciudad: string;

  @Column({ default: true })
  estado: boolean;

  @Column()
  id_usuario: number;

  @Column({ nullable: true })
  id_departamento: number;

  @ManyToOne(() => Departamento, (departamento) => departamento.direcciones, {
    nullable: true, 
    onDelete: 'SET NULL', 
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_departamento' })
  departamento?: Departamento;
  

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
