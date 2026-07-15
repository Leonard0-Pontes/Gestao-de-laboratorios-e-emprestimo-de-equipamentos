import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'O e-mail fornecido é inválido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email!: string;

  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  senha!: string;

  @IsString({ message: 'O nome deve ser uma string.' })
  @IsOptional() 
  nome?: string;

  
  @IsString({ message: 'A role deve ser uma string.' })
  @IsOptional() 
  role?: 'admin' | 'comum';
}