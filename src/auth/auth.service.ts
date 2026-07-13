import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService, UsuarioSemSenha } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(private readonly usuariosService: UsuariosService) {}

  async validarUsuario(nome: string, email: string, senhaAberta: string): Promise<UsuarioSemSenha> {
    const usuario = this.usuariosService.buscarPorEmail(email);

    // Valida se o usuário existe e se os dados conferem
    if (
      !usuario || 
      usuario.senhaHash !== senhaAberta || 
      usuario.nome.trim().toLowerCase() !== nome.trim().toLowerCase()
    ) {
      throw new UnauthorizedException('Credenciais ou dados inválidos');
    }

    return this.usuariosService.removerSenha(usuario);
  }
}