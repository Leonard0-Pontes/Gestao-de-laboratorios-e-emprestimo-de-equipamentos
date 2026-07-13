import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLabDto } from './dtos/create-lab.dto';
import { UpdateLabDto } from 'src/laboratorio/dtos/update-lab.dto';

type Laboratorio = CreateLabDto & {
  id: number;
};

@Injectable()
export class LaboratorioService {
  private laboratorios: Laboratorio[] = [
    {
      id: 1,
      nome: 'Laboratório de Redes',
      num_id: 'D18',
      localizacao: 'Ala D',
      status: 'Ocupado',
    },
    {
      id: 2,
      nome: 'Laboratório de Informática',
      num_id: 'D16',
      localizacao: 'Ala D',
      status: 'Reservado',
    },
    {
      id: 3,
      nome: 'Laboratório de Mecânica',
      num_id: 'E17',
      localizacao: 'Ala E',
      status: 'Reservado',
    },
    {
      id: 4,
      nome: 'Laboratório de Química',
      num_id: 'C20',
      localizacao: 'Ala C',
      status: 'Disponível',
    },
    {
      id: 5,
      nome: 'Laboratório de Alimentos',
      num_id: 'C15',
      localizacao: 'Ala C',
      status: 'Disponível',
    },
    {
      id: 6,
      nome: 'Laboratório de Computação',
      num_id: 'E09',
      localizacao: 'Ala E',
      status: 'Ocupado',
    },
  ];

  criar(dados: CreateLabDto) {
    const novoLab: Laboratorio = {
      id: this.laboratorios.length + 1,
      ...dados,
    };
    this.laboratorios.push(novoLab);
    return novoLab;
  }

  listar(status?: string, limite?: number, pagina?: number) {
    let resultado = [...this.laboratorios];
    if (status) {
      resultado = resultado.filter((s) => s.status === status);
    }
    if (limite && limite > 0) {
      pagina = pagina ?? 1;
      const inicio = (pagina - 1) * limite;
      const fim = inicio + limite;
      resultado = resultado.slice(inicio, fim);
    }
    return resultado;
  }

  buscarId(id: number) {
    const tarefa = this.laboratorios.find((l) => l.id === id);
    if (!tarefa) {
      throw new NotFoundException('Laboratório não encontrado.');
    }
    return tarefa;
  }

  atualizarParcial(id: number, dados: UpdateLabDto) {
    const laboratorio = this.buscarId(id);
    // Sem os "dadosFiltrados", o patch substitui todos os valores não adicionados por "vazios"
    const dadosFiltrados = Object.fromEntries(
      Object.entries(dados).filter(([, valor]) => valor !== undefined),
    );
    const atualizada = { ...laboratorio, ...dadosFiltrados };
    this.laboratorios = this.laboratorios.map((l) =>
      l.id === id ? atualizada : l,
    );
    return atualizada;
  }

  remover(id: number) {
    const existe = this.laboratorios.some((l) => l.id === id);
    if (!existe) {
      throw new NotFoundException('Laboratório não encontrado.');
    }
    this.laboratorios = this.laboratorios.filter((l) => l.id !== id);
  }
}
