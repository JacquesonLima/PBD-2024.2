import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { EquipamentosService } from '../../services/equipamentos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { delay } from 'rxjs';

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

  tipos: string[] = ['Eletrônico', 'Áudio', 'Informática', 'Acessório'];
  filtroTipo: string = '';

  pageSize: number = 10;
  currentPage: number = 1;

  isLoading: boolean = true;

  constructor(private equipamentosService: EquipamentosService) {}

  ngOnInit() {
    this.isLoading = true;
    this.equipamentosService
      .listarTodos()
      .pipe(delay(500))
      .subscribe({
        next: (data) => {
          this.equipamentos = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar equipamentos:', err);
          this.isLoading = false;
        },
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
