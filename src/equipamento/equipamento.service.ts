import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipDto } from './dtos/create-equip.dto';
import { UpdateEquipDto } from './dtos/update-equip.dto';

type ArquivoRecebido = {
    nomeOriginal: string,
    tipo: string,
    tamanho: number
}

type Equipamento = CreateEquipDto & {
    id: number,
    imagem?: ArquivoRecebido
}

@Injectable()
export class EquipamentoService {
    private equipamentos: Equipamento[] = [];

    criar(dados: CreateEquipDto) {
        const novoEquip: Equipamento = {
            id: this.equipamentos.length + 1, ...dados
        }
        this.equipamentos.push(novoEquip)
        return novoEquip;
    }
    
    listar() {
        return this.equipamentos;
    }

    buscarPorId(id: number) {
        const tarefa = this.equipamentos.find((l) => l.id === id);
        if (!tarefa) {
            throw new NotFoundException('Equipamento não encontrado.');
        }
        return tarefa;
    }
    
    atualizarParcial(id: number, dados: UpdateEquipDto) {
        const equipamento = this.buscarPorId(id);
        const atualizada = { ...equipamento, ...dados };
        this.equipamentos = this.equipamentos.map((l) => (l.id === id ? atualizada : l));
        return atualizada;
    }
    
    remover(id: number) {
        const existe = this.equipamentos.some((l) => l.id === id);
        if (!existe) {
            throw new NotFoundException('Equipamento não encontrado.');
        }
    }
}
