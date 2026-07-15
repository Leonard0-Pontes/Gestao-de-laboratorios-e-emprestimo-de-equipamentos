import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { setUsuariosService } from '../common/decorators/user.decorator';

@Module({
  controllers: [UsuariosController],
  providers: [
    UsuariosService,
    RolesGuard,
  ],
  exports: [UsuariosService],
})
export class UsuariosModule {
  constructor(private usuariosService: UsuariosService) {
    setUsuariosService(usuariosService);
  }
}