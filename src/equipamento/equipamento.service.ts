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

    criarComArquivo(dados: CreateEquipDto, imagem: Express.Multer.File) {
        const novoEquip: Equipamento = {
            id: this.equipamentos.length + 1, ...dados, imagem: {
                nomeOriginal: imagem.originalname,
                tipo: imagem.mimetype,
                tamanho: imagem.size
            }
        }
        this.equipamentos.push(novoEquip)
        return novoEquip; 
    }
    
    listar(status?: string, limite?: number, pagina?: number) {
        let resultado = [...this.equipamentos]
        if (status) {
            resultado = resultado.filter((s) => s.status === status)
        }
        if (limite && limite > 0) {
            pagina = pagina ?? 1
            const inicio = (pagina - 1) * limite
            const fim = inicio + limite
            resultado = resultado.slice(inicio, fim)
        }
        return resultado;
    }

    buscarId(id: number) {
        const tarefa = this.equipamentos.find((l) => l.id === id);
        if (!tarefa) {
            throw new NotFoundException('Equipamento não encontrado.');
        }
        return tarefa;
    }
    
    atualizarParcial(id: number, dados: UpdateEquipDto) {
        const equipamento = this.buscarId(id);
        // Sem os "dadosFiltrados", o patch substitui todos os valores não adicionados por "vazios"
        const dadosFiltrados = Object.fromEntries(
            Object.entries(dados).filter(([, valor]) => valor !== undefined),
        );
        const atualizada = { ...equipamento, ...dadosFiltrados };
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
