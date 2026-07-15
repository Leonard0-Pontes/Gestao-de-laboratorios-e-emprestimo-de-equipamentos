import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LaboratorioModule } from './laboratorio/laboratorio.module';
import { EquipamentoModule } from './equipamento/equipamento.module';
import { ReservaModule } from './reserva/reserva.module';
import { EmprestimoModule } from './emprestimo/emprestimo.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [LaboratorioModule, EquipamentoModule, ReservaModule, EmprestimoModule,AuthModule,UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
