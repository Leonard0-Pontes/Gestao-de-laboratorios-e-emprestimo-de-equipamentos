import { IsIn, IsOptional } from 'class-validator';

export class UpdateReservaDto { 
  @IsIn(['Aprovada', 'Cancelada', 'Concluída'])
  @IsOptional()
  status?: 'Aprovada' | 'Cancelada' | 'Concluída';
}