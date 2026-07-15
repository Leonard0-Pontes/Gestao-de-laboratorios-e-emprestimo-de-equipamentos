import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UsuariosService } from '../../usuarios/usuarios.service';
import type { Usuario } from '../../usuarios/usuarios.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usuariosService: UsuariosService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.headers['x-user-id'];
    
    if (!userId) {
      throw new ForbiddenException('Header x-user-id é obrigatório.');
    }

    const usuario = this.usuariosService.buscarPorId(userId);
    if (!usuario) {
      throw new ForbiddenException('Usuário não encontrado.');
    }

    const hasRole = requiredRoles.includes(usuario.role);
    if (!hasRole) {
      throw new ForbiddenException(
        `Acesso negado. Papel necessário: ${requiredRoles.join(' ou ')}. Seu papel: ${usuario.role}`
      );
    }

    request['usuario'] = usuario;
    return true;
  }
}