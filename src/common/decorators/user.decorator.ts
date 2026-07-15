import { createParamDecorator, ExecutionContext, BadRequestException, NotFoundException } from '@nestjs/common';
import type { Usuario } from '../../usuarios/usuarios.service';

// Usamos um cache global simples para buscar usuários
let usuariosService: any;

export const setUsuariosService = (service: any) => {
  usuariosService = service;
};

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Usuario => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request.headers['x-user-id'];
    
    if (!userId) {
      throw new BadRequestException('Header x-user-id é obrigatório.');
    }
    
    const usuario = usuariosService?.buscarPorId(userId);
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado.`);
    }
    
    return usuario;
  },
);