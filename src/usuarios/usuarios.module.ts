import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller'; // IMPORTANTE: adicione esta importação

@Module({
  controllers: [UsuariosController], // IMPORTANTE: registre o controller aqui
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}