import { Test, TestingModule } from '@nestjs/testing';
import { EquipamentoController } from './equipamento.controller';

describe('EquipamentoController', () => {
  let controller: EquipamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipamentoController],
    }).compile();

    controller = module.get<EquipamentoController>(EquipamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
