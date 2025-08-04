import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Inventario } from 'src/inventario/inventario.entity';
import { Lotes } from 'src/lotes/lotes.entity';

@Entity('asigna_lotes')
export class AsignacionLotes {
  @PrimaryGeneratedColumn()
  id_asignacion: number;

  @Column()
  id_inventario: number;

  @ManyToOne(() => Inventario, (inventario) => inventario.asignaciones_lote)
  @JoinColumn({ name: 'id_inventario' })
  inventario: Inventario;

  @ManyToOne(() => Lotes, (lote) => lote.asignaciones_lote)
  @JoinColumn({ name: 'id_lote' })
  lote: Lotes;

  @Column()
  estado: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
