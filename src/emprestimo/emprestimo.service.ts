import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateEmprestimoDto } from './dtos/create-emprestimo.dto';
import { EquipamentoService } from '../equipamento/equipamento.service';

type Emprestimo = {
  id: number;
  usuarioId: number;
  equipamentoId: number;
  dataPrevista: string;
  dataDevolucao?: string; // preenchida quando finalizado
  status: 'Aguardando' | 'Aprovado' | 'Finalizado';
  dataEmprestimo: Date; // data de criação
};

@Injectable()
export class EmprestimoService {
  private emprestimos: Emprestimo[] = [];

  constructor(private readonly equipamentoService: EquipamentoService) { }

  criar(usuarioId: number, dto: CreateEmprestimoDto) {
    // 1. Verifica se equipamento existe e está disponível
    const equipamento = this.equipamentoService.buscarId(dto.equipamentoId);

    if (equipamento.status !== 'Disponível') {
      throw new ConflictException('Equipamento não está disponível para empréstimo.');
    }

    // 2. Cria o empréstimo com status 'Aguardando'
    const novoEmprestimo: Emprestimo = {
      id: this.emprestimos.length + 1,
      usuarioId,
      equipamentoId: dto.equipamentoId,
      dataPrevista: dto.dataPrevista,
      dataDevolucao: undefined,
      status: 'Aguardando',
      dataEmprestimo: new Date(),
    };

    this.emprestimos.push(novoEmprestimo);
    return novoEmprestimo;
  }

  listar() {
    return this.emprestimos;
  }

  buscarPorId(id: number) {
    const emprestimo = this.emprestimos.find((e) => e.id === id);
    if (!emprestimo) {
      throw new NotFoundException('Empréstimo não encontrado.');
    }
    return emprestimo;
  }

  aprovar(id: number) {
    const emprestimo = this.buscarPorId(id);

    if (emprestimo.status === 'Finalizado') {
      throw new ConflictException('Empréstimo já finalizado.');
    }

    if (emprestimo.status === 'Aprovado') {
      throw new ConflictException('Empréstimo já aprovado.');
    }

    // Atualiza o status do equipamento para "Reservado"
    this.equipamentoService.atualizarParcial(emprestimo.equipamentoId, {
      status: 'Reservado',
    });

    emprestimo.status = 'Aprovado';
    return emprestimo;
  }

  devolver(id: number) {
    const emprestimo = this.buscarPorId(id);

    if (emprestimo.status === 'Finalizado') {
      throw new ConflictException('Empréstimo já finalizado.');
    }

    if (emprestimo.status === 'Aguardando') {
      throw new ConflictException('Empréstimo ainda não foi aprovado.');
    }

    // Libera o equipamento
    this.equipamentoService.atualizarParcial(emprestimo.equipamentoId, {
      status: 'Disponível',
    });

    emprestimo.status = 'Finalizado';
    emprestimo.dataDevolucao = new Date().toISOString(); // registra data de devolução
    return emprestimo;
  }

  remover(id: number) {
    const emprestimo = this.emprestimos.find(e => e.id === id);
    if (!emprestimo) {
      throw new NotFoundException('Empréstimo não encontrado.');
    }

    if (emprestimo.status === 'Aprovado') {
      this.equipamentoService.atualizarParcial(emprestimo.equipamentoId, {
        status: 'Disponível',
      });
    }

    this.emprestimos = this.emprestimos.filter(e => e.id !== id);
    return { message: 'Empréstimo removido com sucesso.' };
  }
}