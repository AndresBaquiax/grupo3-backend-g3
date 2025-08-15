import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DireccionController } from './direccion.controller';
import { DireccionService } from './direccion.service';
import { Direccion } from './direccion.entity';
import { Departamento } from '../departamento/departamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Direccion, Departamento])],
  controllers: [DireccionController],
  providers: [DireccionService],
  exports: [DireccionService], 
})
export class DireccionModule {}