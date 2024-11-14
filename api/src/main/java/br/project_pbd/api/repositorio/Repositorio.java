package br.project_pbd.api.repositorio;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.project_pbd.api.modelo.Usuario;

@Repository
public interface Repositorio extends CrudRepository<Usuario, Integer> {

  Optional<Usuario> findyByUsername(String username);

}
