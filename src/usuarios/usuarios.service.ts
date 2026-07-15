import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from '../auth/dto/login.dto';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senhaHash: string;
}

export type UsuarioSemSenha = Omit<Usuario, 'senhaHash'>;

@Injectable()
export class UsuariosService {
  // O usuário de ID '1' será o nosso Administrador padrão
  private readonly usuarios: Usuario[] = [
    { id: '1', nome: 'Admin Bruno', email: 'bruno@example.com', senhaHash: '123456' }
  ];

  // 1. CADASTRAR (Apenas o Admin de ID '1' pode criar novas contas)
  criar(dados: LoginDto, idOperador: string): UsuarioSemSenha {
    // Validação de Administrador
    if (idOperador !== '1') {
      throw new ForbiddenException('Apenas o administrador (ID 1) pode cadastrar novos usuários.');
    }

    const emailExistente = this.usuarios.find(u => u.email === dados.email);
    if (emailExistente) {
      throw new BadRequestException('Este endereço de e-mail já está cadastrado.');
    }

    const novoUsuario: Usuario = {
      id: (this.usuarios.length + 1).toString(),
      nome: dados.nome || 'Usuário Sem Nome',
      email: dados.email,
      senhaHash: dados.senha,
    };

    this.usuarios.push(novoUsuario);
    return this.removerSenha(novoUsuario);
  }

  // 2. LISTAR TODOS
  listarTodos(): UsuarioSemSenha[] {
    return this.usuarios.map(u => this.removerSenha(u));
  }

  // 3. BUSCAR POR ID
  buscarPorId(id: string): UsuarioSemSenha {
    const usuario = this.usuarios.find(u => u.id === id);
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não foi encontrado.`);
    }
    return this.removerSenha(usuario);
  }

  // 4. DELETAR (Apenas o Admin pode deletar, e o Admin NÃO pode ser deletado)
  deletar(idParaDeletar: string, idOperador: string): boolean {
    // Regra 1: Apenas o administrador (ID '1') pode deletar contas
    if (idOperador !== '1') {
      throw new ForbiddenException('Apenas o administrador (ID 1) possui permissão para excluir contas.');
    }

    // Regra 2: O próprio administrador não pode ser excluído do sistema
    if (idParaDeletar === '1') {
      throw new BadRequestException('A conta de Administrador (ID 1) não pode ser excluída do sistema.');
    }

    const index = this.usuarios.findIndex((u) => u.id === idParaDeletar);
    if (index === -1) {
      return false;
    }

    this.usuarios.splice(index, 1);
    return true;
  }

  buscarPorEmail(email: string): Usuario | undefined {
    return this.usuarios.find(u => u.email === email);
  }

  removerSenha(usuario: Usuario): UsuarioSemSenha {
    const { senhaHash, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }
}