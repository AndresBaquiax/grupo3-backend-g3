import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './register/register.module';
import { CategoriasModule } from './categorias/categorias.module';
import { PedidoModule } from './pedidos/pedido.module';
import { DireccionModule } from './direcciones/direccion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '6SH667G1',
      database: 'database',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsuarioModule,
    CategoriasModule,
    PedidoModule,
    DireccionModule,
  ],
})
export class AppModule {}
