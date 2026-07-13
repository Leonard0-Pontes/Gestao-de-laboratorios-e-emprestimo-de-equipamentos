import { Injectable } from '@nestjs/common';

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  senhaHash: string;
};

// Faz com que o objeto final tenha apenas id, nome e email
export type UsuarioSemSenha = Omit<Usuario, 'senhaHash'>;

@Injectable()
export class UsuariosService {
  private readonly usuarios: Usuario[] = [
    {
      id: 1,
      nome: 'Bruno Costa',
      email: 'bruno@example.com',
      senhaHash: '123456',
    },
    {
      id: 2,
      nome: 'Ana Lima',
      email: 'ana@example.com',
      senhaHash: 'senhaSegura',
    }
  ];

  buscarPorEmail(email: string): Usuario | null {
    const emailNormalizado = email.trim().toLowerCase();
    return this.usuarios.find((u) => u.email === emailNormalizado) ?? null;
  }

  removerSenha(usuario: Usuario): UsuarioSemSenha {
    // Remove a senhaHash e extrai o resto 
    const { senhaHash, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }
}