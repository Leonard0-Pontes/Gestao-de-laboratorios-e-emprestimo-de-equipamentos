import { IsInt, IsDateString, Min, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateEmprestimoDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  equipamentoId!: number;

  @IsDateString()
  @IsNotEmpty()
  dataPrevista!: string; // data prevista para devolução

  @IsDateString()
  @IsOptional()
  dataDevolucao?: string; // opcional, preenchida na devolução
}