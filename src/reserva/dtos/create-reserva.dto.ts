import {IsInt, IsDateString, Min } from 'class-validator';

export class CreateReservaDto {
  @IsInt()
  @Min(1)
  equipamentoId: number;

  @IsDateString()
  dataInicio: string;

  @IsDateString()
  dataFim: string;

}