package br.project_pbd.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.project_pbd.api.domain.user.Equipamento;
import br.project_pbd.api.services.EquipamentoService;

@RestController
@RequestMapping("/equipamentos")
public class EquipamentoController {

  @Autowired
  private EquipamentoService equipamentoService;

  @GetMapping
  public ResponseEntity<List<Equipamento>> listarTodos() {
    List<Equipamento> equipamentos = equipamentoService.listarTodos();
    return ResponseEntity.ok(equipamentos);
  }

}
