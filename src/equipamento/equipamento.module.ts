import { Module } from '@nestjs/common';
import { EquipamentoController } from './equipamento.controller';
import { EquipamentoService } from './equipamento.service';
import { LaboratorioService } from 'src/laboratorio/laboratorio.service';

@Module({
  controllers: [EquipamentoController],
  providers: [EquipamentoService, LaboratorioService],
  exports: [EquipamentoService],
})
export class EquipamentoModule {}
