import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsIn,
  IsDateString,
} from 'class-validator';

export class CreateLabDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  // num_id = Numero que identifica o laboratório. EX: D18
  num_id!: string;

  @IsString()
  @IsNotEmpty()
  localizacao!: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsIn(['Disponível', 'Reservado', 'Ocupado'])
  status!: 'Disponível' | 'Reservado' | 'Ocupado';

  @IsDateString()
  // Tentar esse tipo, caso não funcione, modifica-lo ou remover "reservas" por inteiro
  @IsOptional()
  // Datas reservadas
  reservas?: string;
}
