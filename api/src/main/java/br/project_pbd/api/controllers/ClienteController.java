package br.project_pbd.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.project_pbd.api.domain.Cliente;
import br.project_pbd.api.repositories.ClienteRepository;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

  @Autowired
  private ClienteRepository clienteRepository;

  @GetMapping
  public List<Cliente> listarClientes() {
    return clienteRepository.findAll();
  }

  @PostMapping
  public Cliente adicionarCliente(@RequestBody Cliente cliente) {
    return clienteRepository.save(cliente);
  }
}