package br.project_pbd.api.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import br.project_pbd.api.domain.Cliente;
import br.project_pbd.api.repositories.ClienteRepository;

@Service
public class ClienteService {

  private final ClienteRepository clienteRepository;

  public ClienteService(ClienteRepository clienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  public Cliente salvar(Cliente cliente) {
    return clienteRepository.save(cliente);
  }

  public Optional<Cliente> buscarCliente(String termo) {
    if (termo.matches("\\d+")) { // Verifica se é um CPF (só números)
      return clienteRepository.findByCpf(termo);
    } else {
      return clienteRepository.findByNomeContainingIgnoreCase(termo);
    }
  }

}
