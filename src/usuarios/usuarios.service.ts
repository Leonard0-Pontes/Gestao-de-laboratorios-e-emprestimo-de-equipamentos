import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from '../auth/dto/login.dto';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senhaHash: string;
  role: 'admin' | 'comum';
}

export type UsuarioSemSenha = Omit<Usuario, 'senhaHash'>;

@Injectable()
export class UsuariosService {
  private readonly usuarios: Usuario[] = [
    { id: '1', nome: 'Admin Bruno', email: 'bruno@example.com', senhaHash: '123456', role: 'admin' }
  ];

  criar(dados: LoginDto & { role?: 'admin' | 'comum' }, idOperador: string): UsuarioSemSenha {
    const operador = this.usuarios.find(u => u.id === idOperador);

    if (!operador || operador.role !== 'admin') {
      throw new ForbiddenException('Apenas administradores podem cadastrar novos usuários.');
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
      role: dados.role || 'comum',
    };

    this.usuarios.push(novoUsuario);
    return this.removerSenha(novoUsuario);
  }

  listarTodos(): UsuarioSemSenha[] {
    return this.usuarios.map(u => this.removerSenha(u));
  }

  buscarPorId(id: string): UsuarioSemSenha {
    const usuario = this.usuarios.find(u => u.id === id);
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não foi encontrado.`);
    }
    return this.removerSenha(usuario);
  }

  
  atualizar(idParaAtualizar: string, dadosParaAtualizar: Partial<LoginDto>, idOperador: string): UsuarioSemSenha {
    const operador = this.usuarios.find(u => u.id === idOperador);
    if (!operador) {
      throw new ForbiddenException('Operador inválido ou não autenticado.');
    }

    const usuario = this.usuarios.find(u => u.id === idParaAtualizar);
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${idParaAtualizar} não encontrado.`);
    }

    
    if (dadosParaAtualizar.role && operador.role !== 'admin') {
      throw new ForbiddenException('Apenas administradores podem alterar funções (roles) no sistema.');
    }

   
    if (operador.role !== 'admin' && idParaAtualizar !== idOperador) {
      throw new ForbiddenException('Você não tem permissão para atualizar os dados de outro usuário.');
    }

    
    if (dadosParaAtualizar.email && dadosParaAtualizar.email !== usuario.email) {
      const emailExistente = this.usuarios.find(u => u.email === dadosParaAtualizar.email);
      if (emailExistente) {
        throw new BadRequestException('Este endereço de e-mail já está em uso por outro usuário.');
      }
      usuario.email = dadosParaAtualizar.email;
    }

   
    if (dadosParaAtualizar.nome) usuario.nome = dadosParaAtualizar.nome;
    if (dadosParaAtualizar.senha) usuario.senhaHash = dadosParaAtualizar.senha;
    if (dadosParaAtualizar.role) usuario.role = dadosParaAtualizar.role;

    return this.removerSenha(usuario);
  }

  deletar(idParaDeletar: string, idOperador: string): boolean {
    const operador = this.usuarios.find(u => u.id === idOperador);

    if (!operador || operador.role !== 'admin') {
      throw new ForbiddenException('Apenas administradores possuem permissão para excluir contas.');
    }

    if (idParaDeletar === '1') {
      throw new BadRequestException('A conta de Administrador principal (ID 1) não pode ser excluída.');
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