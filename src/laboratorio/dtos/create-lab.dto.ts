import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsDateString, IsDate } from 'class-validator'

export class CreateLabDto {
    @IsString()
    @IsNotEmpty()
    nome!: string

    @IsString()
    @IsNotEmpty()
    // num_id = Numero que identifica o laboratório. EX: D18
    num_id!: string

    @IsString()
    @IsNotEmpty()
    localizacao!: string

    @IsString()
    @IsOptional()
    descricao?: string

    @IsBoolean()
    @IsNotEmpty()
    esta_ocupado!: boolean

    @IsDateString()
    // Tentar esse tipo, caso não funcione, modifica-lo ou remover "reservas" por inteiro
    @IsOptional()
    // Datas reservadas
    reservas?: string
}