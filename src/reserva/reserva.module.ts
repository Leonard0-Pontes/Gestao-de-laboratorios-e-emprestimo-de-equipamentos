import { Module } from '@nestjs/common';
import { ReservaController } from './reserva.controller';
import { ReservaService } from './reserva.service';
import { EquipamentoModule } from '../equipamento/equipamento.module';

@Module({
  imports: [EquipamentoModule],
  controllers: [ReservaController],
  providers: [ReservaService]
})
export class ReservaModule {}
