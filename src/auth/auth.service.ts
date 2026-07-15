import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(private usuariosService: UsuariosService) {}

  async login(email: string, senha: string) {
    const usuario = this.usuariosService.buscarPorEmail(email);
    if (!usuario || usuario.senhaHash !== senha) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const { senhaHash, ...usuarioSemSenha } = usuario;
    return {
      usuario: usuarioSemSenha,
      mensagem: 'Login realizado com sucesso!',
      instrucao: 'Use o header "x-user-id" com o ID do usuário para acessar as rotas protegidas.',
    };
  }

  async register(nome: string, email: string, senha: string) {
    const novo = this.usuariosService.registrarAluno(nome, email, senha);
    return {
      usuario: novo,
      mensagem: 'Registro realizado com sucesso!',
      instrucao: 'Use o header "x-user-id" com o ID do usuário para acessar as rotas protegidas.',
    };
  }
}