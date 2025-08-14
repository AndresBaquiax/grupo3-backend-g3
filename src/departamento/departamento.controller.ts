// departamento.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DepartamentoService } from './departamento.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Departamentos')
@Controller('departamentos')
export class DepartamentoController {
  constructor(private readonly departamentoService: DepartamentoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo departamento' })
  @ApiResponse({
    status: 201,
    description: 'Departamento creado exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos en la solicitud.' })
  create(@Body() dto: CreateDepartamentoDto) {
    return this.departamentoService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los departamentos activos' })
  @ApiResponse({
    status: 200,
    description: 'Listado de departamentos obtenido correctamente.',
  })
  findAll() {
    return this.departamentoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar un departamento específico por su ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único del departamento',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Departamento encontrado.' })
  @ApiResponse({
    status: 404,
    description: 'No se encontró un departamento con ese ID.',
  })
  findOne(@Param('id') id: string) {
    return this.departamentoService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un departamento existente' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID del departamento a modificar',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Departamento actualizado correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Departamento no encontrado.',
  })
  update(@Param('id') id: string, @Body() dto: UpdateDepartamentoDto) {
    return this.departamentoService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un departamento (soft delete)' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID del departamento a eliminar',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Departamento eliminado exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Departamento no encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.departamentoService.remove(+id);
  }
}

