import { Injectable } from '@nestjs/common';
import { CreateEquipDto } from './dtos/create-equip.dto';

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
export class EquipamentoService {}
