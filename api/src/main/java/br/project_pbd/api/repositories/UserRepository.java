package br.project_pbd.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.project_pbd.api.domain.user.User;

public interface UserRepository extends JpaRepository<User, String> {

  Optional<User> findByUsername(String username);

}
