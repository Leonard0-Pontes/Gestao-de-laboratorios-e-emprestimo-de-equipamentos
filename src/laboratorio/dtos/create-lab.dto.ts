import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsDateString } from 'class-validator'
import { Transform } from 'class-transformer'

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

    @Transform(({ value }) => {
        if (value === true || value === 'true' || value === 'on') return true;
        if (value === false || value === 'false') return false;
        return value;
    })
    @IsBoolean()
    @IsNotEmpty()
    esta_ocupado!: boolean

    @IsDateString()
    // Tentar esse tipo, caso não funcione, modifica-lo ou remover "reservas" por inteiro
    @IsOptional()
    // Datas reservadas
    reservas?: string
}