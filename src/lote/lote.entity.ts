import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('lote')
export class Lote {
  @PrimaryGeneratedColumn()
  id_lote: number;

  @Column({ type: 'date' })
  fecha_vencimiento: Date;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
