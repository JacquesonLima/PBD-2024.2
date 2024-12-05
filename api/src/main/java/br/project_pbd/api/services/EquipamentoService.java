package br.project_pbd.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.project_pbd.api.domain.Equipamento;
import br.project_pbd.api.repositories.EquipamentoRepository;

@Service
public class EquipamentoService {

  @Autowired
  private EquipamentoRepository equipamentoRepository;

  public List<Equipamento> listarTodos() {
    return equipamentoRepository.findAll();
  }

}
