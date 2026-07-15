import { IsIn } from 'class-validator';

export class UpdateReservaDto { 
  @IsIn(['Aprovada', 'Cancelada', 'Concluída'])
   status: 'Aprovada' | 'Cancelada' | 'Concluída';
}