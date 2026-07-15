import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsIn
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

  @IsString()
  @IsNotEmpty()
  // O mesmo que "num_id" para os laboratórios
  idLab!: string;
}
