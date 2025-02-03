package br.project_pbd.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
<<<<<<< HEAD
import org.springframework.http.ResponseEntity;
=======
>>>>>>> 15e1c61806be4c8c3386d8fb7b3ee7791a413c3b
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.RequestParam;
=======
>>>>>>> 15e1c61806be4c8c3386d8fb7b3ee7791a413c3b
import org.springframework.web.bind.annotation.RestController;

import br.project_pbd.api.domain.Cliente;
import br.project_pbd.api.repositories.ClienteRepository;
<<<<<<< HEAD
import br.project_pbd.api.services.ClienteService;
=======
>>>>>>> 15e1c61806be4c8c3386d8fb7b3ee7791a413c3b

@RestController
@RequestMapping("/clientes")
public class ClienteController {

  @Autowired
  private ClienteRepository clienteRepository;

<<<<<<< HEAD
  @Autowired
  private ClienteService clienteService;

=======
>>>>>>> 15e1c61806be4c8c3386d8fb7b3ee7791a413c3b
  @GetMapping
  public List<Cliente> listarClientes() {
    return clienteRepository.findAll();
  }

<<<<<<< HEAD
  @GetMapping("/buscar")
  public ResponseEntity<Cliente> buscarCliente(@RequestParam String termo) {
    return clienteService.buscarCliente(termo)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

=======
>>>>>>> 15e1c61806be4c8c3386d8fb7b3ee7791a413c3b
  @PostMapping
  public Cliente adicionarCliente(@RequestBody Cliente cliente) {
    return clienteRepository.save(cliente);
  }
}