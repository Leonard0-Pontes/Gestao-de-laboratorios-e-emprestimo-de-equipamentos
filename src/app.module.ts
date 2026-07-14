import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LaboratorioModule } from './laboratorio/laboratorio.module';
import { EquipamentoModule } from './equipamento/equipamento.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [LaboratorioModule, EquipamentoModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
