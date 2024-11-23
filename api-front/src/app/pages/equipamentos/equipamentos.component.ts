import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EquipamentosService } from '../../services/equipamentos.service';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './equipamentos.component.html',
  styleUrl: './equipamentos.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class EquipamentosComponent implements OnInit {
  equipamentos: Equipamento[] = [];

  constructor(private equipamentosService: EquipamentosService) {}

  ngOnInit(): void {
    this.equipamentosService.listarTodos().subscribe((data) => {
      this.equipamentos = data;
    });
  }
}
