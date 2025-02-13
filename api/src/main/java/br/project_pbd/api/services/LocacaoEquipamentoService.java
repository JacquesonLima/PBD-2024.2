package br.project_pbd.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.project_pbd.api.domain.LocacaoEquipamento;
import br.project_pbd.api.repositories.LocacaoEquipamentoRepository;

@Service
public class LocacaoEquipamentoService {

  @Autowired
  private LocacaoEquipamentoRepository locacaoEquipamentoRepository;

  public LocacaoEquipamentoService(LocacaoEquipamentoRepository locacaoEquipamentoRepository) {
    this.locacaoEquipamentoRepository = locacaoEquipamentoRepository;
  }

  public LocacaoEquipamento salvar(LocacaoEquipamento locacaoEquipamento) {
    return this.locacaoEquipamentoRepository.save(locacaoEquipamento);
  }

}
