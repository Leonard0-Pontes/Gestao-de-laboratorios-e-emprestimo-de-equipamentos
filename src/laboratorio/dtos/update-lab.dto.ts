import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator'
import { Transform } from 'class-transformer'

export class UpdateLabDto {
    @IsString()
    @IsOptional()
    nome?: string

    @IsString()
    @IsOptional()
    // num_id = Numero que identifica o laboratório. EX: D18
    num_id?: string

    @IsString()
    @IsOptional()
    localizacao?: string

    @IsString()
    @IsOptional()
    descricao?: string

    @Transform(({ value }) => {
        if (value === true || value === 'true' || value === 'on') return true;
        if (value === false || value === 'false') return false;
        return value;
    })
    @IsBoolean()
    @IsOptional()
    esta_ocupado?: boolean
    
    @IsDateString()
    // Tentar esse tipo, caso não funcione, modifica-lo ou remover "reservas" por inteiro
    @IsOptional()
    // Datas reservadas
    reservas?: string
}