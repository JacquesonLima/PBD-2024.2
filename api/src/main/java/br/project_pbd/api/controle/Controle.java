package br.project_pbd.api.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.project_pbd.api.modelo.Usuario;
import br.project_pbd.api.repositorio.Repositorio;

@RestController
@CrossOrigin(origins = "*")
public class Controle {

  @Autowired
  private Repositorio acao;

  @PostMapping("/")
  public Usuario cadastrar(@RequestBody Usuario usuario) {
    return acao.save(usuario);
  }

  @GetMapping("/")
  public Iterable<Usuario> selecionar() {
    return acao.findAll();
  }

  @PutMapping("/")
  public Usuario editar(@RequestBody Usuario usuario) {
    return acao.save(usuario);
  }

  @DeleteMapping("/{id}")
  public void remover(@PathVariable int id) {
    acao.deleteById(id);
  }

}
