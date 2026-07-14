import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-users.dto';
import { IsEmail, IsEnum, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { UserRole } from '../entities/users.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Nome não pode estar vazio' })
  name?: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  @IsOptional()
  @IsNotEmpty({ message: 'E-mail não pode estar vazio' })
  email?: string;

  @IsEnum(UserRole, { message: 'Role deve ser admin ou user' })
  @IsOptional()
  role?: UserRole;
}