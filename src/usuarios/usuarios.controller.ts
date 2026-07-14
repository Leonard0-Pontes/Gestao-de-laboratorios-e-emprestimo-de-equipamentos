import { Controller, Post, Get, Delete, Body, Param, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { LoginDto } from '../auth/dto/login.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

 //(Cadastrar Usuário)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  criar(@Body() criarUsuarioDto: LoginDto) {
    return this.usuariosService.criar(criarUsuarioDto);
  }

  //(Listar Todos)
  @Get()
  @HttpCode(HttpStatus.OK)
  listar() {
    return this.usuariosService.listarTodos();
  }

  //(Buscar por ID específico)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  buscarPorId(@Param('id') id: string) {
    // Corrigido: Passando a string id diretamente sem converter com Number()
    return this.usuariosService.buscarPorId(id); 
  }

  //(Remover Usuário)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remover(@Param('id') id: string) {
    // No deletar, convertemos para número pois o método do service espera um number
    const deletado = this.usuariosService.deletar(Number(id));

    if (!deletado) {
      throw new NotFoundException('Usuário não encontrado para exclusão.');
    }

    return {
      sucesso: true,
      mensagem: `Usuário com ID ${id} foi removido com sucesso.`,
    };
  }
}