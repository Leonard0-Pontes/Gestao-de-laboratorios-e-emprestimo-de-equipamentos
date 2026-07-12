import { Controller, Body, Get, Post, Patch, Delete, ParseIntPipe, Param, Query, DefaultValuePipe } from '@nestjs/common';
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
    listar(
        @Query('status') status?: string,
        @Query('limite', new DefaultValuePipe(10), ParseIntPipe) limite?: number 
    ) {
        return this.equipamentoService.listar(status);
    }

    @Get(":id")
    buscarId(@Param('id', ParseIntPipe) id: number) {
        return this.equipamentoService.buscarId(id)
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
