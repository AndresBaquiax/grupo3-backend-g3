import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioModule as RegisterModule } from './register/register.module';
import { Usuario } from './usuario/usuario.entity';
import { RegisterUsuario } from './register/register.entity';
import { Rol } from './rol/rol.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Proveedor } from './proveedor/proveedor.entity';
import { ProveedorModule } from './proveedor/proveedor.module';
import { FacturaModule } from './factura/factura.module';
import { Factura } from './factura/factura.entity';
import { DetalleFacturaModule } from './detalle_factura/detalle_factura.module';
import { InventarioModule } from './inventario/inventario.module';
import { LoteModule } from './lote/lote.module';
import { ProductoModule } from './producto/producto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { DetalleFactura } from './detalle_factura/detalle_factura.entity';
import { Inventario } from './inventario/inventario.entity';
import { Lote } from './lote/lote.entity';
import { Producto } from './producto/producto.entity';
import { Categoria } from './categoria/categoria.entity';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuarios } from './usuarios/usuarios.entity';

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
        entities: [Usuario, RegisterUsuario, Rol, Proveedor, Factura, DetalleFactura, Inventario, Lote, Producto, Categoria, Usuarios],
        synchronize: false,
      }),
    }),
    AuthModule,
    UsuarioModule,
    RegisterModule,
    ConfigModule.forRoot(),
    ProveedorModule,
    FacturaModule,
    DetalleFacturaModule,
    InventarioModule,
    LoteModule,
    ProductoModule,
    CategoriaModule,
    UsuariosModule
  ],
})
export class AppModule {}
