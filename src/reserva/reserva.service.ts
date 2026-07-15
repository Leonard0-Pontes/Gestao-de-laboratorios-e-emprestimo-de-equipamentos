import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateReservaDto } from './dtos/create-reserva.dto';
import { EquipamentoService } from '../equipamento/equipamento.service';

type Reserva = {
  id: number;
  usuarioId: number;
  equipamentoId: number;
  dataInicio: string;
  dataFim: string;
  status: 'Aprovada' | 'Cancelada' | 'Concluída';
};

@Injectable()
export class ReservaService {
  private reservas: Reserva[] = [];

  constructor(private readonly equipamentoService: EquipamentoService) { }

  criar(usuarioId: number, dto: CreateReservaDto) {
    const equipamento = this.equipamentoService.buscarId(dto.equipamentoId);

    if (equipamento.status !== 'Disponível') {
      throw new ConflictException('Equipamento não está disponível para reserva.'); // vereficar se o estado do equipamento é qualquer coisa, senão disponível, se sim, lança uma exceção
    }
    const conflito = this.reservas.some(
      (r) =>
        r.equipamentoId === dto.equipamentoId &&
        r.status === 'Aprovada' &&
        !(dto.dataFim < r.dataInicio || dto.dataInicio > r.dataFim),
    );

    if (conflito) {
      throw new ConflictException('Equipamento já reservado nesse período.');     // vereficar se o equipamento já está reservado, se sim, lança uma exceção
    }

    const novaReserva: Reserva = {
      id: this.reservas.length + 1,
      usuarioId,
      equipamentoId: dto.equipamentoId,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
      status: 'Aprovada',
    };

    this.equipamentoService.atualizarParcial(dto.equipamentoId, {
      status: 'Reservado',  // Atualiza o equipamento para "Reservado"
    });

    this.reservas.push(novaReserva);
    return novaReserva;
  }

  listar() {
    return this.reservas;
  }

  buscarPorId(id: number) {
    const reserva = this.reservas.find((r) => r.id === id);
    if (!reserva) {
      throw new NotFoundException('Reserva não encontrada.');
    }
    return reserva;
  }

  cancelar(id: number) {
    const reserva = this.buscarPorId(id);

    if (reserva.status === 'Cancelada') {
      throw new ConflictException('Reserva já está cancelada.');
    }

    if (reserva.status === 'Concluída') {
      throw new ConflictException('Reservas concluídas não podem ser canceladas.');
    }

    if (reserva.status === 'Aprovada') {
      this.equipamentoService.atualizarParcial(reserva.equipamentoId, {
        status: 'Disponível',
      });
    }

    reserva.status = 'Cancelada';
    return reserva;
  }

  concluir(id: number) {
    const reserva = this.buscarPorId(id);

    if (reserva.status === 'Concluída') {
      throw new ConflictException('Reserva já está concluída.');
    }

    if (reserva.status === 'Cancelada') {
      throw new ConflictException('Reservas canceladas não podem ser concluídas.');
    }

    this.equipamentoService.atualizarParcial(reserva.equipamentoId, {
      status: 'Disponível',
    });

    reserva.status = 'Concluída';
    return reserva;
  }

 remover(id: number) {
  const reserva = this.reservas.find(r => r.id === id);
  if (!reserva) {
    throw new NotFoundException('Reserva não encontrada.');
  }

  if (reserva.status === 'Aprovada') {
    this.equipamentoService.atualizarParcial(reserva.equipamentoId, {
      status: 'Disponível',
    });
  }

  this.reservas = this.reservas.filter(r => r.id !== id);
  return { message: 'Reserva removida com sucesso.' };
}
}