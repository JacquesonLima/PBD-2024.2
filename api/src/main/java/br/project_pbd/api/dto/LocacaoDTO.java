package br.project_pbd.api.dto;

public class LocacaoDTO {

  private Long id;
  private EquipamentoDTO equipamento;
  private ClienteDTO cliente;
  private String dataLocacao;

  public LocacaoDTO(Long id, EquipamentoDTO equipamento, ClienteDTO cliente, String dataLocacao) {
    this.id = id;
    this.equipamento = equipamento;
    this.cliente = cliente;
    this.dataLocacao = dataLocacao;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public EquipamentoDTO getEquipamento() {
    return equipamento;
  }

  public void setEquipamento(EquipamentoDTO equipamento) {
    this.equipamento = equipamento;
  }

  public ClienteDTO getCliente() {
    return cliente;
  }

  public void setCliente(ClienteDTO cliente) {
    this.cliente = cliente;
  }

  public String getDataLocacao() {
    return dataLocacao;
  }

  public void setDataLocacao(String dataLocacao) {
    this.dataLocacao = dataLocacao;
  }
}
