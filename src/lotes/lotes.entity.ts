import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('lote')
export class Lotes {
  @PrimaryGeneratedColumn()
  id_lote: number;

  @Column({ type: 'date', nullable: false })
  fecha_vencimiento: Date;

  @Column({ type: 'integer', nullable: false })
  cantidad: number;

  @Column({ type: 'boolean', nullable: false })
  estado: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
