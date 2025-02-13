import { TestBed } from '@angular/core/testing';

import { LocacaoEquipamentoService } from './locacao-equipamento.service';

describe('LocacaoEquipamentoService', () => {
  let service: LocacaoEquipamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocacaoEquipamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
