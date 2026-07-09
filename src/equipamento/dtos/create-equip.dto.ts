import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsDateString } from 'class-validator'

export class CreateEquipDto {
    @IsString()
    @IsNotEmpty()
    nome!: string

    @IsString()
    @IsOptional()
    descricao?: string

    @IsBoolean()
    @IsNotEmpty()
    esta_disponivel!: boolean

    @IsDateString()
    @IsOptional()
    dataEmprestimo?: string

    @IsDateString()
    @IsOptional()
    dataDevolucao?: string

    @IsString()
    @IsNotEmpty()
    // O mesmo que "num_id" para os laboratórios
    idLab!: string
}