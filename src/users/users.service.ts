import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User, UserRole } from './entities/users.entity'; // ← ADICIONAR UserRole aqui
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  create(createUserDto: CreateUserDto): User {
    // Verifica se email já existe
    const existingUser = this.users.find(u => u.email === createUserDto.email);
    if (existingUser) {
      throw new ConflictException(`E-mail ${createUserDto.email} já está cadastrado`);
    }

    const user = new User({
      id: String(this.idCounter++),
      name: createUserDto.name,
      email: createUserDto.email,
      role: createUserDto.role || UserRole.USER, // ← Agora UserRole está importado
    });

    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const user = this.findOne(id);
    const index = this.users.indexOf(user);

    // Se estiver atualizando email, verifica duplicidade
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = this.users.find(u => u.email === updateUserDto.email);
      if (existingUser) {
        throw new ConflictException(`E-mail ${updateUserDto.email} já está cadastrado por outro usuário`);
      }
    }

    // Atualiza apenas os campos fornecidos
    const updatedUser = new User({
      ...user,
      ...updateUserDto,
      updatedAt: new Date(),
    });

    this.users[index] = updatedUser;
    return updatedUser;
  }

  remove(id: string): void {
    const user = this.findOne(id);
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
  }

  // Método utilitário para limpar todos os usuários (útil para testes)
  clearAll(): void {
    this.users = [];
    this.idCounter = 1;
  }
}