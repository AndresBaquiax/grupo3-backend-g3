import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('asigna_lotes')
export class AsignacionLotes {
  @PrimaryGeneratedColumn()
  id_asignacion: number;

  @Column({ type: 'integer', nullable: false })
  id_inventario: number;

  @Column({ type: 'integer', nullable: false })
  id_lote: number;

  @Column({ type: 'boolean', nullable: false })
  estado: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
