import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipDto } from './dtos/create-equip.dto';
import { UpdateEquipDto } from './dtos/update-equip.dto';
import { LaboratorioService } from 'src/laboratorio/laboratorio.service';

type ArquivoRecebido = {
  nomeOriginal: string;
  tipo: string;
  tamanho: number;
};

type Equipamento = CreateEquipDto & {
  id: number;
  imagem?: ArquivoRecebido;
};

@Injectable()
export class EquipamentoService {
  constructor(private readonly laboratorioService : LaboratorioService) {}
  private equipamentos: Equipamento[] = [
    {id: 1, nome: "Access Point/Roteador", status: "Disponível", idLab: "D18"},
    {id: 2, nome: "Maquina de datilografia", status: "Disponível", idLab: "D16"},
    {id: 3, nome: "Caldeirão", status: "Ocupado", idLab: "C15"},
    {id: 4, nome: "Tubos de ensaio", status: "Ocupado", idLab: "C20"},
    {id: 5, nome: "Robo carro", status: "Reservado", idLab: "E17"},
    {id: 6, nome: "Gabinete", status: "Reservado", idLab: "E09"}
  ];

  // Para validar no laboratorioService
  buscarIdLab(idLab: string) {
    return this.equipamentos.filter(
      (e) => e.idLab === idLab,
    );
  }

  criar(dados: CreateEquipDto) {
    // Valida se o idLab corresponde com algum laboratório existente.
    this.laboratorioService.buscarNum_Id(dados.idLab);
    const novoEquip: Equipamento = {
      id: this.equipamentos.length + 1,
      ...dados,
    };
    this.equipamentos.push(novoEquip);
    return novoEquip;
  }

  criarComArquivo(dados: CreateEquipDto, imagem: Express.Multer.File) {
    this.laboratorioService.buscarNum_Id(dados.idLab);
    const novoEquip: Equipamento = {
      id: this.equipamentos.length + 1,
      ...dados,
      imagem: {
        nomeOriginal: imagem.originalname,
        tipo: imagem.mimetype,
        tamanho: imagem.size,
      },
    };
    this.equipamentos.push(novoEquip);
    return novoEquip;
  }

  listar(status?: string, limite?: number, pagina?: number) {
    let resultado = [...this.equipamentos];
    if (status) {
      resultado = resultado.filter((s) => s.status.toLowerCase() === status.toLowerCase());
      if (resultado.length === 0) {
        throw new NotFoundException("Status escolhido não existe, faça uso de (Disponível), (Reservado) ou (Ocupado).")
      }
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
    const tarefa = this.equipamentos.find((e) => e.id === id);
    if (!tarefa) {
      throw new NotFoundException('Equipamento não encontrado.');
    }
    return tarefa;
  }

  atualizarParcial(id: number, dados: UpdateEquipDto) {
    if (dados.idLab) {
      this.laboratorioService.buscarNum_Id(dados.idLab);
    }
    const equipamento = this.buscarId(id);
    // Sem os "dadosFiltrados", o patch substitui todos os valores não adicionados por "vazios"
    const dadosFiltrados = Object.fromEntries(
      Object.entries(dados).filter(([, valor]) => valor !== undefined),
    );
    const atualizada = { ...equipamento, ...dadosFiltrados };
    this.equipamentos = this.equipamentos.map((e) =>
      e.id === id ? atualizada : e,
    );
    return atualizada;
  }

  remover(id: number) {
    const existe = this.equipamentos.some((e) => e.id === id);
    if (!existe) {
      throw new NotFoundException('Equipamento não encontrado.');
    }
    this.equipamentos = this.equipamentos.filter((e) => e.id !== id);
  }
}
