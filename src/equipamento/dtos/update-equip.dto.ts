import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator'

export class UpdateEquipDto {
    @IsString()
    @IsOptional()
    nome?: string

    @IsString()
    @IsOptional()
    descricao?: string

    @IsBoolean()
    @IsOptional()
    esta_disponivel?: boolean

    @IsDateString()
    @IsOptional()
    dataEmprestimo?: string

    @IsDateString()
    @IsOptional()
    dataDevolucao?: string

    @IsString()
    @IsOptional()
    // O mesmo que "num_id" para os laboratórios
    idLab?: string
}