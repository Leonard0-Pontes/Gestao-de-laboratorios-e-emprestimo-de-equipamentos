import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto'; // ← Importe o DTO

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senhaHash: string;
  role: 'admin' | 'aluno';
}

export type UsuarioSemSenha = Omit<Usuario, 'senhaHash'>;

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [
    {
      id: '1',
      nome: 'Admin Bruno',
      email: 'bruno@example.com',
      senhaHash: '123456',
      role: 'admin',
    },
    {
      id: '2',
      nome: 'Aluno João',
      email: 'joao@example.com',
      senhaHash: '123456',
      role: 'aluno',
    },
  ];

  // ---- Métodos públicos ----

  buscarPorId(id: string): Usuario | undefined {
    return this.usuarios.find((u) => u.id === id);
  }

  buscarPorEmail(email: string): Usuario | undefined {
    return this.usuarios.find((u) => u.email === email);
  }

  // ---- CRUD (com validação de papel) ----

  criar(dados: CreateUsuarioDto, operador: Usuario): UsuarioSemSenha {
    if (operador.role !== 'admin') {
      throw new ForbiddenException('Apenas administradores podem criar usuários.');
    }

    const emailExistente = this.usuarios.find((u) => u.email === dados.email);
    if (emailExistente) {
      throw new BadRequestException('E-mail já cadastrado.');
    }

    const novo: Usuario = {
      id: (this.usuarios.length + 1).toString(),
      nome: dados.nome,
      email: dados.email,
      senhaHash: dados.senha,
      role: dados.role,
    };
    this.usuarios.push(novo);
    return this.removerSenha(novo);
  }

  listarTodos(operador: Usuario): UsuarioSemSenha[] {
    if (operador.role !== 'admin') {
      throw new ForbiddenException('Apenas administradores podem listar todos os usuários.');
    }
    return this.usuarios.map((u) => this.removerSenha(u));
  }

  buscarPorIdPublico(id: string, operador: Usuario): UsuarioSemSenha {
    if (operador.role === 'admin' || operador.id === id) {
      const usuario = this.usuarios.find((u) => u.id === id);
      if (!usuario) throw new NotFoundException('Usuário não encontrado.');
      return this.removerSenha(usuario);
    }
    throw new ForbiddenException('Você não tem permissão para ver este usuário.');
  }

  deletar(idParaDeletar: string, operador: Usuario): boolean {
    if (operador.role !== 'admin') {
      throw new ForbiddenException('Apenas administradores podem deletar usuários.');
    }

    if (idParaDeletar === '1') {
      throw new BadRequestException('Não é possível deletar o administrador padrão.');
    }

    const index = this.usuarios.findIndex((u) => u.id === idParaDeletar);
    if (index === -1) return false;
    this.usuarios.splice(index, 1);
    return true;
  }

  // ---- NOVO MÉTODO: Atualizar usuário ----

  atualizar(id: string, dados: UpdateUsuarioDto, operador: Usuario): UsuarioSemSenha {
    // Verifica permissão: admin pode atualizar qualquer um, aluno só a si mesmo
    if (operador.role !== 'admin' && operador.id !== id) {
      throw new ForbiddenException('Você só pode atualizar seu próprio perfil.');
    }

    const usuario = this.usuarios.find((u) => u.id === id);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    // Se for admin, pode atualizar role também (desde que não seja o admin padrão)
    if (operador.role === 'admin' && dados.role) {
      if (id === '1') {
        throw new BadRequestException('Não é possível alterar o papel do administrador padrão.');
      }
      usuario.role = dados.role;
    } else if (dados.role) {
      // Aluno tentando mudar role
      throw new ForbiddenException('Você não pode alterar seu papel.');
    }

    // Atualiza os campos
    if (dados.nome) {
      usuario.nome = dados.nome;
    }

    if (dados.email) {
      // Verifica se email já existe (exceto se for o mesmo usuário)
      const emailExistente = this.usuarios.find((u) => u.email === dados.email && u.id !== id);
      if (emailExistente) {
        throw new BadRequestException('Este e-mail já está em uso.');
      }
      usuario.email = dados.email;
    }

    if (dados.senha) {
      usuario.senhaHash = dados.senha;
    }

    return this.removerSenha(usuario);
  }

  // ---- Registro público (aluno) ----

  registrarAluno(nome: string, email: string, senha: string): UsuarioSemSenha {
    if (this.usuarios.find((u) => u.email === email)) {
      throw new BadRequestException('E-mail já cadastrado.');
    }
    const novo: Usuario = {
      id: (this.usuarios.length + 1).toString(),
      nome,
      email,
      senhaHash: senha,
      role: 'aluno',
    };
    this.usuarios.push(novo);
    return this.removerSenha(novo);
  }

  // ---- Utilitários ----

  private removerSenha(usuario: Usuario): UsuarioSemSenha {
    const { senhaHash, ...rest } = usuario;
    return rest;
  }
}