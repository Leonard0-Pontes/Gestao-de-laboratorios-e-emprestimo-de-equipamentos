import { Controller, Body, Post, Get, Patch, Delete, ParseIntPipe, Param } from '@nestjs/common';
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
    listar() {
        return this.laboratorioService.listar();
    }

    @Patch(':id')
    atualizarParcial(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateLabDto) {
        return this.laboratorioService.atualizarParcial(id, body);
    }
    
    @Delete(':id')
        remover(@Param('id', ParseIntPipe) id: number) {
        this.laboratorioService.remover(id);
    }
}
