import { Controller, Body, Get, Post, Patch, Delete, ParseIntPipe, Param } from '@nestjs/common';
import { CreateEquipDto } from './dtos/create-equip.dto';
import { EquipamentoService } from './equipamento.service';
import { UpdateEquipDto } from './dtos/update-equip.dto';

@Controller('equipamento')
export class EquipamentoController {
    constructor(private readonly equipamentoService: EquipamentoService) {}
    
    @Post()
    criar(@Body() body: CreateEquipDto) {
        return this.equipamentoService.criar(body);
    }
    
    @Get()
    listar() {
        return this.equipamentoService.listar();
    }

    @Patch(':id')
    atualizarParcial(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateEquipDto) {
        return this.equipamentoService.atualizarParcial(id, body);
    }
    
    @Delete(':id')
    remover(@Param('id', ParseIntPipe) id: number) {
        this.equipamentoService.remover(id);
    }
}
