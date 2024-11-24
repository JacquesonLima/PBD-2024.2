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

  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private equipamentosService: EquipamentosService) {}

  ngOnInit() {
    this.equipamentosService.listarTodos().subscribe((data) => {
      this.equipamentos = data;
    });
  }

  get equipamentosFiltrados() {
    const filteredEquipamentos = this.filtroTipo
      ? this.equipamentos.filter(
          (equipamento) => equipamento.tipo === this.filtroTipo
        )
      : this.equipamentos;

    // Calcula o índice inicial e final para a página atual
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    return filteredEquipamentos.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Total de páginas com base no tamanho da página
  get totalPages() {
    return Math.ceil(this.equipamentos.length / this.pageSize);
  }

  adicionarEquipamento() {
    console.log('Adicionar');
  }

  editarEquipamento() {
    console.log('Editar');
  }

  alugarEquipamento() {
    console.log('Alugar');
  }
}
