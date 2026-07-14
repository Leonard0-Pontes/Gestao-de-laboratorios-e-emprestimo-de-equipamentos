import { IsString, IsOptional, IsBoolean, IsDateString, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateEquipDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @Transform(({ value }) => {
    if (value === true || value === 'true' || value === 'on') return true;
    if (value === false || value === 'false') return false;
    return value;
  })
  @IsBoolean()
  @IsOptional()
  esta_ocupado?: boolean;

  @IsDateString()
  @IsOptional()
  dataEmprestimo?: string;

  @IsDateString()
  @IsOptional()
  dataDevolucao?: string;

  @IsString()
  @IsOptional()
  // O mesmo que "num_id" para os laboratórios
  idLab?: string;

  @IsIn(['Disponível', 'Reservado', 'Ocupado'])
  @IsOptional()
  status?: 'Disponível' | 'Reservado' | 'Ocupado';
}
