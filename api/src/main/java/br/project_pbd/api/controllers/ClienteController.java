package br.project_pbd.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.project_pbd.api.domain.Cliente;
import br.project_pbd.api.repositories.ClienteRepository;
import br.project_pbd.api.services.ClienteService;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

  @Autowired
  private ClienteRepository clienteRepository;

  @Autowired
  private ClienteService clienteService;

  @GetMapping
  public List<Cliente> listarClientes() {
    return clienteRepository.findAll();
  }

  @GetMapping("/buscar")
  public ResponseEntity<Cliente> buscarCliente(@RequestParam String termo) {
    return clienteService.buscarCliente(termo)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<Cliente> cadastrarCliente(@RequestBody Cliente cliente) {
    Cliente novoCliente = clienteService.salvar(cliente);
    return ResponseEntity.status(HttpStatus.CREATED).body(novoCliente);
  }
}