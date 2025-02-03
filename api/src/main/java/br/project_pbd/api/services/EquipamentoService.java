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

<<<<<<< HEAD
  public EquipamentoService(EquipamentoRepository equipamentoRepository) {
    this.equipamentoRepository = equipamentoRepository;
  }

=======
>>>>>>> 15e1c61806be4c8c3386d8fb7b3ee7791a413c3b
  public List<Equipamento> listarTodos() {
    return equipamentoRepository.findAll();
  }

}
