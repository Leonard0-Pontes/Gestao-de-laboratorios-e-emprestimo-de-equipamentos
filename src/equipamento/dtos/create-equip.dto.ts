import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsDateString } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateEquipDto {
    @IsString()
    @IsNotEmpty()
    nome!: string

    @IsString()
    @IsOptional()
    descricao?: string

    @Transform(({ value }) => {
        if (value === true || value === 'true' || value === 'on') return true;
        if (value === false || value === 'false') return false;
        return value;
    })
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