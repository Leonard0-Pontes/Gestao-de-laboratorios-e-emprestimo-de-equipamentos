import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Delete,
  ParseIntPipe,
  Param,
  HttpCode,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { CreateLabDto } from './dtos/create-lab.dto';
import { UpdateLabDto } from './dtos/update-lab.dto';
import { LaboratorioService } from './laboratorio.service';

@Controller('laboratorio')
export class LaboratorioController {
  constructor(private readonly laboratorioService: LaboratorioService) {}

  @Post()
  criar(@Body() body: CreateLabDto) {
    return this.laboratorioService.criar(body);
  }

  @Get()
  listar(
    @Query('status') status?: string,
    @Query('limite', new DefaultValuePipe(10), ParseIntPipe) limite?: number,
    @Query('pagina', new DefaultValuePipe(1), ParseIntPipe) pagina?: number,
  ) {
    return this.laboratorioService.listar(status, limite, pagina);
  }

  @Get(':id')
  buscarId(@Param('id', ParseIntPipe) id: number) {
    return this.laboratorioService.buscarId(id);
  }

  @Patch(':id')
  atualizarParcial(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateLabDto,
  ) {
    return this.laboratorioService.atualizarParcial(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remover(@Param('id', ParseIntPipe) id: number) {
    this.laboratorioService.remover(id);
  }
}
