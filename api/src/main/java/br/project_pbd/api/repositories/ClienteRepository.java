package br.project_pbd.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.project_pbd.api.domain.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}
