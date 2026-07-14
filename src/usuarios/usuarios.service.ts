import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { LoginDto } from '../auth/dto/login.dto';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senhaHash: string;
}

// Tipo auxiliar para um  retorno seguro 
export type UsuarioSemSenha = Omit<Usuario, 'senhaHash'>;

@Injectable()
export class UsuariosService {
 
  private usuarios: Usuario[] = [
    { id: '1', nome: 'Bruno Costa', email: 'bruno@example.com', senhaHash: '123456' }
  ]; 

 
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

 
  criar(createUsuarioDto: LoginDto): UsuarioSemSenha {
    const emailExiste = this.usuarios.some(u => u.email === createUsuarioDto.email);
    if (emailExiste) {
      throw new BadRequestException('Este e-mail já está cadastrado.');
    }

    const novoUsuario: Usuario = {
      id: (this.usuarios.length + 1).toString(),
      nome: createUsuarioDto.nome || 'Usuário Sem Nome',
      email: createUsuarioDto.email,
      senhaHash: createUsuarioDto.senha,
    };

    this.usuarios.push(novoUsuario);
    return this.removerSenha(novoUsuario);
  }

  
  deletar(id: number): boolean {
    const index = this.usuarios.findIndex((u) => Number(u.id) === id);
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