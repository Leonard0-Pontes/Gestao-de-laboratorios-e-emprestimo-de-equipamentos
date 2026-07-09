import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator'

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

    @IsBoolean()
    @IsOptional()
    esta_ocupado?: boolean
    
    @IsDateString()
    // Tentar esse tipo, caso não funcione, modifica-lo ou remover "reservas" por inteiro
    @IsOptional()
    // Datas reservadas
    reservas?: string
}