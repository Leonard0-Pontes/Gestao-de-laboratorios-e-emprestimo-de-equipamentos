import { Controller, Post, Body, Get, Patch, Param, ParseIntPipe, Req } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dtos/create-reserva.dto';

@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  criar(@Req() req, @Body() dto: CreateReservaDto) {
    const usuarioId = req.user?.id ?? 1;
    return this.reservaService.criar(usuarioId, dto);
  }

  @Get()
  listar() {
    return this.reservaService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.buscarPorId(id);
  }

  @Patch(':id/cancelar')
  cancelar(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.cancelar(id);
  }

  @Patch(':id/concluir')
  concluir(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.concluir(id);
  }
}