import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsIn
} from 'class-validator';

export class CreateLabDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  // num_id = Numero que identifica o laboratório. EX: D18
  // Não incluido no escopo original do projeto, adicionado para ajudar identificação dos labs.
  num_id!: string;

  @IsString()
  @IsNotEmpty()
  localizacao!: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  /* 
  Não incluido no escopo original do projeto, adicionado por seguir a mesma lógica do emprestimo
  de equipamentos de informar o status do objeto.
  */
  @IsIn(['Disponível', 'Reservado', 'Ocupado'])
  status!: 'Disponível' | 'Reservado' | 'Ocupado';
}
