import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto'; // ← Importe o novo DTO
import { Roles } from '../common/decorators/roles.decorator';
import { User } from '../common/decorators/user.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import type { Usuario } from './usuarios.service';

@Controller('usuarios')
@UseGuards(RolesGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // GET /usuarios/me → qualquer usuário logado pode ver seus dados
  @Get('me')
  getMe(@User() usuario: Usuario) {
    return this.usuariosService.buscarPorIdPublico(usuario.id, usuario);
  }

  // POST /usuarios → apenas admin
  @Post()
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  criar(@Body() dto: CreateUsuarioDto, @User() operador: Usuario) {
    return this.usuariosService.criar(dto, operador);
  }

  // GET /usuarios → apenas admin
  @Get()
  @Roles('admin')
  listar(@User() operador: Usuario) {
    return this.usuariosService.listarTodos(operador);
  }

  // GET /usuarios/:id → admin pode ver qualquer um, aluno só pode ver a si mesmo
  @Get(':id')
  buscarPorId(@Param('id') id: string, @User() operador: Usuario) {
    return this.usuariosService.buscarPorIdPublico(id, operador);
  }

  // DELETE /usuarios/:id → apenas admin
  @Delete(':id')
  @Roles('admin')
  deletar(@Param('id') id: string, @User() operador: Usuario) {
    const deletado = this.usuariosService.deletar(id, operador);
    if (!deletado) {
      return { sucesso: false, mensagem: 'Usuário não encontrado.' };
    }
    return { sucesso: true, mensagem: 'Usuário removido com sucesso.' };
  }

  // PATCH /usuarios/me → atualizar próprio perfil (qualquer usuário)
  @Patch('me')
  atualizarPerfil(
    @Body() dados: UpdateUsuarioDto,
    @User() operador: Usuario,
  ) {
    // Remove role da atualização (usuário não pode mudar próprio papel)
    const { role, ...dadosPermitidos } = dados;
    return this.usuariosService.atualizar(operador.id, dadosPermitidos, operador);
  }

  // PATCH /usuarios/:id → atualizar usuário (admin only)
  @Patch(':id')
  @Roles('admin')
  atualizar(
    @Param('id') id: string,
    @Body() dados: UpdateUsuarioDto,
    @User() operador: Usuario,
  ) {
    return this.usuariosService.atualizar(id, dados, operador);
  }
}