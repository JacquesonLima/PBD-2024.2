package br.project_pbd.api.dto;

public class EquipamentoDTO {

  private Long id;
  private String nome;
  private String tipo;
  private int quantidade;
  private double valor;
  private int totalAlocacoes;

  public EquipamentoDTO(Long id, String nome, String tipo, int quantidade, double valor, int totalAlocacoes) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.quantidade = quantidade;
    this.valor = valor;
    this.totalAlocacoes = totalAlocacoes;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public String getTipo() {
    return tipo;
  }

  public void setTipo(String tipo) {
    this.tipo = tipo;
  }

  public int getQuantidade() {
    return quantidade;
  }

  public void setQuantidade(int quantidade) {
    this.quantidade = quantidade;
  }

  public double getValor() {
    return valor;
  }

  public void setValor(double valor) {
    this.valor = valor;
  }

  public int getTotalAlocacoes() {
    return totalAlocacoes;
  }

  public void setTotalAlocacoes(int totalAlocacoes) {
    this.totalAlocacoes = totalAlocacoes;
  }
}
