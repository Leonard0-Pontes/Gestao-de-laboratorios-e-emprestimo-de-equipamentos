import { Controller, Post, Get, Delete, Body, Param, Headers, HttpCode, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { LoginDto } from '../auth/dto/login.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // 1. POST: http://localhost:3000/usuarios (Cadastrar Usuário)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  criar(
    @Body() criarUsuarioDto: LoginDto,
    @Headers('x-operador-id') idOperador: string // Captura quem está enviando a requisição
  ) {
    if (!idOperador) {
      throw new BadRequestException('É necessário informar o ID do operador no header x-operador-id para criar contas.');
    }
    return this.usuariosService.criar(criarUsuarioDto, idOperador);
  }

  // 2. GET: http://localhost:3000/usuarios (Listar Todos)
  @Get()
  @HttpCode(HttpStatus.OK)
  listar() {
    return this.usuariosService.listarTodos();
  }

  // 3. GET: http://localhost:3000/usuarios/:id (Buscar por ID específico)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  buscarPorId(@Param('id') id: string) {
    return this.usuariosService.buscarPorId(id); 
  }

  // 4. DELETE: http://localhost:3000/usuarios/:id (Remover Usuário)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remover(
    @Param('id') idParaDeletar: string,
    @Headers('x-operador-id') idOperador: string // Captura quem está tentando deletar
  ) {
    if (!idOperador) {
      throw new BadRequestException('É necessário informar o ID do operador no header x-operador-id para excluir.');
    }

    const deletado = this.usuariosService.deletar(idParaDeletar, idOperador);

    if (!deletado) {
      throw new NotFoundException('Usuário não encontrado para exclusão.');
    }

    return {
      sucesso: true,
      mensagem: `Usuário com ID ${idParaDeletar} foi removido com sucesso pelo administrador.`,
    };
  }
}