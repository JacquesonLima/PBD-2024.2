package br.project_pbd.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.project_pbd.api.domain.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

  Optional<Cliente> findByCpf(String cpf);

  Optional<Cliente> findByNomeContainingIgnoreCase(String nome);

}
