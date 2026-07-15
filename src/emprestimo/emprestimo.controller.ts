import { Controller, Post, Body, Get, Patch, Param, ParseIntPipe, Req } from '@nestjs/common';
import { EmprestimoService } from './emprestimo.service';
import { CreateEmprestimoDto } from './dtos/create-emprestimo.dto';

@Controller('emprestimos')
export class EmprestimoController {
  constructor(private readonly emprestimoService: EmprestimoService) {}

  @Post()
  criar(@Req() req, @Body() dto: CreateEmprestimoDto) {
    const usuarioId = req.user?.id ?? 1; // temporário, depois integra com autenticação
    return this.emprestimoService.criar(usuarioId, dto);
  }

  @Get()
  listar() {
    return this.emprestimoService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.emprestimoService.buscarPorId(id);
  }

  @Patch(':id/aprovar')
  aprovar(@Param('id', ParseIntPipe) id: number) {
    return this.emprestimoService.aprovar(id);
  }

  @Patch(':id/devolver')
  devolver(@Param('id', ParseIntPipe) id: number) {
    return this.emprestimoService.devolver(id);
  }
}