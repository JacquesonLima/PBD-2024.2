import { TestBed } from '@angular/core/testing';

import { LocacaoServiceService } from './locacao.service.service';

describe('LocacaoServiceService', () => {
  let service: LocacaoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocacaoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
