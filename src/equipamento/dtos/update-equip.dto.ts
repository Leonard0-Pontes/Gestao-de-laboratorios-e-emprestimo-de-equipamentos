import { IsString, IsOptional, IsIn} from 'class-validator';

export class UpdateEquipDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsIn(['Disponível', 'Reservado', 'Ocupado'])
  status?: 'Disponível' | 'Reservado' | 'Ocupado';

  @IsString()
  @IsOptional()
  // O mesmo que "num_id" para os laboratórios
  idLab?: string;
}
