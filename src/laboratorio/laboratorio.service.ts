import { Injectable } from '@nestjs/common';
import { CreateLabDto } from './dtos/create-lab.dto';

type Laboratorio = CreateLabDto & {
    id: number
}

@Injectable()
export class LaboratorioService {}
