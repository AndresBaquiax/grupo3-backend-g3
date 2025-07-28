import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioModule as RegisterModule } from './register/register.module';
import { Usuario } from './usuario/usuario.entity';
import { RegisterUsuario } from './register/register.entity';
import { Rol } from './rol/rol.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductosModule } from './productos/productos.module';
import { Producto } from './productos/productos.entity';

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
        entities: [Usuario, RegisterUsuario, Rol, Producto],
        synchronize: false,
      }),
    }),
    AuthModule,
    UsuarioModule,
    RegisterModule,
    ConfigModule.forRoot(),
    ProductosModule,
  ],
})
export class AppModule {}
