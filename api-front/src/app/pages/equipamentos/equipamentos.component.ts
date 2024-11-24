import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { EquipamentosService } from '../../services/equipamentos.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

interface Equipamento {
  nome: string;
  tipo: string;
  quantidade: number;
  valor: number;
  totalAlocacoes: number;
}

@Component({
  selector: 'app-equipamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './equipamentos.component.html',
  styleUrl: './equipamentos.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class EquipamentosComponent implements OnInit {
  equipamentos: Equipamento[] = [];

  tipos: string[] = ['Eletrônico', 'Móvel', 'Ferramenta'];
  filtroTipo: string = '';

  constructor(private equipamentosService: EquipamentosService) {}

  ngOnInit() {
    this.equipamentosService.listarTodos().subscribe((data) => {
      this.equipamentos = data;
    });
  }

  get equipamentosFiltrados() {
    if (this.filtroTipo) {
      return this.equipamentos.filter(
        (equipamento) => equipamento.tipo === this.filtroTipo
      );
    }
    return this.equipamentos;
  }
}
