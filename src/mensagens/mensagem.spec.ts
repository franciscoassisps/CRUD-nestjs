import { Mensagem } from './entities/mensagem.entity';

describe('Mensagem', () => {
  it('should be defined', () => {
    expect(new Mensagem()).toBeDefined();
  });
});
