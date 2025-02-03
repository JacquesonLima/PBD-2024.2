package br.project_pbd.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.project_pbd.api.domain.Locacao;
import br.project_pbd.api.repositories.LocacaoRepository;

@RestController
@RequestMapping("/locacoes")
public class LocacaoController {

    @Autowired
    private LocacaoRepository locacaoRepository;

    @GetMapping
    public List<Locacao> listarLocacoes() {
        return locacaoRepository.findAll();
    }

    @PostMapping
    public Locacao adicionarAlocacao(@RequestBody Locacao alocacao) {
        return locacaoRepository.save(alocacao);
    }
}
