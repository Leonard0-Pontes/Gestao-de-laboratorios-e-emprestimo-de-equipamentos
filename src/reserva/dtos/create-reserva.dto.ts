import {IsInt, IsDateString, Min, IsNotEmpty } from 'class-validator';

export class CreateReservaDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  equipamentoId!: number;

  @IsDateString()
  @IsNotEmpty()
  dataInicio!: string;

  @IsDateString()
  @IsNotEmpty()
  dataFim!: string;

}