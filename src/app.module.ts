import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioModule as RegisterModule } from './register/register.module';
import { Usuario } from './usuario/usuario.entity';
import { RegisterUsuario } from './register/register.entity';
import { Rol } from './rol/rol.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuarios/usuarios.module'; 
import { RegisterModule } from './register/register.module';
import { Usuario } from './usuarios/usuarios.entity'; 
import { Rol } from './rol/rol.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AsignacionLotesProductosModule } from './asignacion-lotes-productos/asignacion-lotes-productos.module';
import { ProductoModule } from './productos/productos.module'; 
import { Producto } from './productos/productos.entity';
import { LotesModule } from './lotes/lotes.module';
import { Lote } from './lotes/lotes.entity';
import { AsignacionLotesModule } from './asignacion-lotes/asignacion-lotes.module';
import { AsignacionLotes } from './asignacion-lotes/asignacion-lotes.entity';
import { ProveedorModule } from './proveedor/proveedor.module';
import { Proveedor } from './proveedor/proveedor.entity';
import { FacturaModule } from './factura/factura.module';
import { Factura } from './factura/factura.entity';
import { DetalleFacturaModule } from './detalle_factura/detalle_factura.module';
import { DetalleFactura } from './detalle_factura/detalle_factura.entity';
import { InventarioModule } from './inventario/inventario.module';
import { Inventario } from './inventario/inventario.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') || '5432', 10),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [Usuario, RegisterUsuario, Rol, Proveedor, Factura, DetalleFactura, Inventario, Lote, Producto, Categoria, Usuarios, Lotes, AsignacionLotes],
        synchronize: false,
      }),
    }),
    AuthModule,
    UsuarioModule,
    RegisterModule,
    ConfigModule.forRoot(),
    ProductosModule,
    LotesModule,
    AsignacionLotesModule,
    ProveedorModule,
    FacturaModule,
    DetalleFacturaModule,
    InventarioModule,
    LoteModule,
    ProductoModule,
    CategoriaModule,
    UsuariosModule,
    ProductosModule,
    LotesModule,
    AsignacionLotesModule
  ],
})
export class AppModule {}
