package br.project_pbd.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.project_pbd.api.domain.Locacao;

@Repository
public interface LocacaoRepository extends JpaRepository<Locacao, Long> {

}
