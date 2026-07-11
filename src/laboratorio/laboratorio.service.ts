import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLabDto } from './dtos/create-lab.dto';
import { UpdateLabDto } from 'src/laboratorio/dtos/update-lab.dto';

type Laboratorio = CreateLabDto & {
    id: number
}

@Injectable()
export class LaboratorioService {
    private laboratorios: Laboratorio[] = [];

    criar(dados: CreateLabDto) {
        const novoLab: Laboratorio = {
            id: this.laboratorios.length + 1, ...dados
        }
        this.laboratorios.push(novoLab)
        return novoLab;
    }

    listar() {
        return this.laboratorios;
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
        const dadosFiltrados = Object.fromEntries(
            Object.entries(dados).filter(([, valor]) => valor !== undefined),
        );
        const atualizada = { ...laboratorio, ...dadosFiltrados };
        this.laboratorios = this.laboratorios.map((l) => (l.id === id ? atualizada : l));
        return atualizada;
    }

    remover(id: number) {
        const existe = this.laboratorios.some((l) => l.id === id);
        if (!existe) {
            throw new NotFoundException('Laboratório não encontrado.');
        }
        this.laboratorios = this.laboratorios.filter((l) => l.id !== id)
    }
}
