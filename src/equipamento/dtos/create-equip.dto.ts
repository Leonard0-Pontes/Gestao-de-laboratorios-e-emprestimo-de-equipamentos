import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsIn,
} from 'class-validator';

export class CreateEquipDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsIn(['Disponível', 'Reservado', 'Ocupado'])
  status!: 'Disponível' | 'Reservado' | 'Ocupado';

  @IsDateString()
  @IsOptional()
  dataEmprestimo?: string;

  @IsDateString()
  @IsOptional()
  dataDevolucao?: string;

  @IsString()
  @IsNotEmpty()
  // O mesmo que "num_id" para os laboratórios
  idLab!: string;
}
