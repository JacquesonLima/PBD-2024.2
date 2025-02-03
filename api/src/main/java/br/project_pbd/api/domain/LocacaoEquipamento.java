package br.project_pbd.api.domain;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "locationEquipments")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LocacaoEquipamento {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "locacao_id", nullable = false)
  private Locacao locacao;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "equipamento_id", nullable = false)
  private Equipamento equipamento;

  private LocalDate dataLocacao;

}