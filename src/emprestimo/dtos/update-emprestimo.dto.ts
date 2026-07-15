import { IsIn, IsDateString, IsOptional } from 'class-validator';

export class UpdateEmprestimoDto {
  @IsIn(['Aprovado', 'Finalizado'])
  status: 'Aprovado' | 'Finalizado';

  @IsDateString()
  @IsOptional()
  dataDevolucao?: string;
}