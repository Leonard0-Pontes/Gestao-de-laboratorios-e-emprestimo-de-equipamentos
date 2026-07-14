import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LaboratorioModule } from './laboratorio/laboratorio.module';
import { EquipamentoModule } from './equipamento/equipamento.module';

@Module({
  imports: [LaboratorioModule, EquipamentoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
