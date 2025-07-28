import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  ParseIntPipe 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@ApiTags('Products')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @ApiOperation({ 
    summary: 'Crear producto', 
    description: 'Crea un nuevo producto en el sistema' 
  })
  @ApiBody({ type: CreateProductoDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Producto creado exitosamente',
    schema: {
      type: 'object',
      properties: {
        id_producto: { type: 'number', example: 1 },
        nombre: { type: 'string', example: 'Laptop Gaming' },
        descripcion: { type: 'string', example: 'Laptop para gaming con tarjeta gráfica dedicada' },
        precio_unitario: { type: 'number', example: 1500.99 },
        stock_minimo: { type: 'number', example: 5 },
        estado: { type: 'boolean', example: true },
        id_categoria: { type: 'number', example: 1 },
        url_imagen: { type: 'string', example: 'https://ejemplo.com/imagen.jpg' },
        created_at: { type: 'string', format: 'date-time', example: '2025-01-27T12:00:00Z' },
        updated_at: { type: 'string', format: 'date-time', example: '2025-01-27T12:00:00Z' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @Post()
  async create(@Body() createProductoDto: CreateProductoDto) {
    try {
      const result = await this.productosService.create(createProductoDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ 
    summary: 'Obtener todos los productos', 
    description: 'Devuelve una lista de todos los productos' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de productos obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id_producto: { type: 'number', example: 1 },
          nombre: { type: 'string', example: 'Laptop Gaming' },
          descripcion: { type: 'string', example: 'Laptop para gaming' },
          precio_unitario: { type: 'number', example: 1500.99 },
          stock_minimo: { type: 'number', example: 5 },
          estado: { type: 'boolean', example: true },
          id_categoria: { type: 'number', example: 1 },
          url_imagen: { type: 'string', example: 'https://ejemplo.com/imagen.jpg' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' }
        }
      }
    }
  })
  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @ApiOperation({ 
    summary: 'Obtener producto por ID', 
    description: 'Devuelve un producto específico por su ID' 
  })
  @ApiParam({ name: 'id', description: 'ID del producto', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Producto encontrado exitosamente',
    schema: {
      type: 'object',
      properties: {
        id_producto: { type: 'number', example: 1 },
        nombre: { type: 'string', example: 'Laptop Gaming' },
        descripcion: { type: 'string', example: 'Laptop para gaming' },
        precio_unitario: { type: 'number', example: 1500.99 },
        stock_minimo: { type: 'number', example: 5 },
        estado: { type: 'boolean', example: true },
        id_categoria: { type: 'number', example: 1 },
        url_imagen: { type: 'string', example: 'https://ejemplo.com/imagen.jpg' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.findOne(id);
  }

  @ApiOperation({ 
    summary: 'Actualizar producto', 
    description: 'Actualiza un producto existente por su ID' 
  })
  @ApiParam({ name: 'id', description: 'ID del producto', example: 1 })
  @ApiBody({ type: UpdateProductoDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Producto actualizado exitosamente',
    schema: {
      type: 'object',
      properties: {
        id_producto: { type: 'number', example: 1 },
        nombre: { type: 'string', example: 'Laptop Gaming Actualizada' },
        descripcion: { type: 'string', example: 'Laptop para gaming actualizada' },
        precio_unitario: { type: 'number', example: 1600.99 },
        stock_minimo: { type: 'number', example: 3 },
        estado: { type: 'boolean', example: true },
        id_categoria: { type: 'number', example: 1 },
        url_imagen: { type: 'string', example: 'https://ejemplo.com/nueva-imagen.jpg' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateProductoDto: UpdateProductoDto
  ) {
    return this.productosService.update(id, updateProductoDto);
  }

  @ApiOperation({ 
    summary: 'Eliminar producto', 
    description: 'Elimina un producto del sistema por su ID' 
  })
  @ApiParam({ name: 'id', description: 'ID del producto', example: 1 })
  @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.remove(id);
  }
}
