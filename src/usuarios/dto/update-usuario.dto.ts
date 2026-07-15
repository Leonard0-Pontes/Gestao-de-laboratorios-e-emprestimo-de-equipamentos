import { IsEmail, IsOptional, IsString, MinLength, IsIn } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  nome?: string;

  @IsOptional()
  @IsEmail({}, { message: 'E-mail inválido' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'A senha deve ser uma string' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  senha?: string;

  @IsOptional()
  @IsIn(['admin', 'aluno'], { message: 'Role deve ser "admin" ou "aluno"' })
  role?: 'admin' | 'aluno';
}