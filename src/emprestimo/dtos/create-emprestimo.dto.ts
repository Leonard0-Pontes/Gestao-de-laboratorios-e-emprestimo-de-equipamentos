import { IsInt, IsDateString, Min, IsOptional } from 'class-validator';

export class CreateEmprestimoDto {
  @IsInt()
  @Min(1)
  equipamentoId: number;

  @IsDateString()
  dataPrevista: string; // data prevista para devolução

  @IsDateString()
  @IsOptional()
  dataDevolucao?: string; // opcional, preenchida na devolução
}