import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { delay } from 'rxjs';

interface Cliente {
  id: number;
  nome: string;
  endereco: string;
  telefone: string;
}

interface Equipamento {
  id: number;
  nome: string;
  tipo: string;
  quantidade: number;
  valor: number;
}

interface LocacaoEquipamento {
  id: number;
  locacao: {
    id: number;
    cliente: Cliente;
  };
  equipamento: Equipamento;
  dataLocacao: string;
}

@Component({
  selector: 'app-locacoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './locacoes.component.html',
  styleUrls: ['./locacoes.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LocacoesComponent implements OnInit {
  clientes: { nome: string; itensAlocados: Equipamento[] }[] = [];
  isLoading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    const apiUrl = 'http://localhost:8080/locacoes-equipamentos'; // URL da API
    this.http
      .get<LocacaoEquipamento[]>(apiUrl)
      .pipe(delay(500)) // Simula um atraso para teste
      .subscribe({
        next: (data) => {
          console.log('Dados recebidos:', data); // Verificando os dados recebidos
          this.organizarPorCliente(data);
        },
        error: (err) => console.error('Erro ao carregar locações:', err),
      });
  }

  organizarPorCliente(locacoesEquipamentos: LocacaoEquipamento[]): void {
    const clientesMap = new Map<
      number,
      { nome: string; itensAlocados: Equipamento[] }
    >();

    locacoesEquipamentos.forEach((locEquip) => {
      // Verificando se locacao e cliente existem
      if (locEquip.locacao && locEquip.locacao.cliente) {
        const cliente = locEquip.locacao.cliente;
        const equipamento = locEquip.equipamento;

        if (!clientesMap.has(cliente.id)) {
          clientesMap.set(cliente.id, {
            nome: cliente.nome,
            itensAlocados: [],
          });
        }

        clientesMap.get(cliente.id)?.itensAlocados.push(equipamento);
      } else {
        console.warn('Locação com dados faltando:', locEquip);
      }
    });

    this.clientes = Array.from(clientesMap.values());
    this.isLoading = false;

    // Verificando os clientes organizados
    console.log('Clientes organizados:', this.clientes);
  }

  exibirDetalhes(cliente: {
    nome: string;
    itensAlocados: Equipamento[];
  }): void {
    const detalhes = `Cliente: ${
      cliente.nome
    }\nItens Locados: ${cliente.itensAlocados
      .map((equipamento) => equipamento.nome)
      .join(', ')}`;
    alert(detalhes);
  }

  formatarItensAlocados(itensAlocados: Equipamento[]): string {
    return itensAlocados.map((equipamento) => equipamento.nome).join(', ');
  }
}
