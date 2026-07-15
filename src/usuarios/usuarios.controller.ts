import { Controller, Post, Get, Delete, Patch, Body, Param, Headers, HttpCode, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { LoginDto } from '../auth/dto/login.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  criar(
    @Body() crearUsuarioDto: LoginDto,
    @Headers('x-operador-id') idOperador: string
  ) {
    if (!idOperador) {
      throw new BadRequestException('É necessário informar o ID do operador no header x-operador-id para criar contas.');
    }
    return this.usuariosService.criar(crearUsuarioDto, idOperador);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  listar() {
    return this.usuariosService.listarTodos();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  buscarPorId(@Param('id') id: string) {
    return this.usuariosService.buscarPorId(id); 
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  atualizar(
    @Param('id') idParaAtualizar: string,
    @Body() atualizarUsuarioDto: Partial<LoginDto>, 
    @Headers('x-operador-id') idOperador: string
  ) {
    if (!idOperador) {
      throw new BadRequestException('É necessário informar o ID do operador no header x-operador-id para atualizar.');
    }
    return this.usuariosService.atualizar(idParaAtualizar, atualizarUsuarioDto, idOperador);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remover(
    @Param('id') idParaDeletar: string,
    @Headers('x-operador-id') idOperador: string
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