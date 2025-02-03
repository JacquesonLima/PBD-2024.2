package br.project_pbd.api.repositories;

<<<<<<< HEAD
import java.util.Optional;

=======
>>>>>>> 15e1c61806be4c8c3386d8fb7b3ee7791a413c3b
import org.springframework.data.jpa.repository.JpaRepository;

import br.project_pbd.api.domain.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

<<<<<<< HEAD
  Optional<Cliente> findByCpf(String cpf);

  Optional<Cliente> findByNomeContainingIgnoreCase(String nome);

=======
>>>>>>> 15e1c61806be4c8c3386d8fb7b3ee7791a413c3b
}
