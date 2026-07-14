import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsOptional() // <-- IMPORTANTE: Torna o nome opcional para o login não quebrar
  @IsString({ message: 'O nome deve ser uma string de texto.' })
  nome?: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @IsEmail({}, { message: 'Por favor, insira um endereço de e-mail válido.' })
  email!: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString({ message: 'A senha deve ser uma string de texto.' })
  @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres.' })
  senha!: string;
}