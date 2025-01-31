import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { delay } from 'rxjs';
import { ModalComponent } from '../../components/modal/modal.component';

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
  status: string;
  valor: number;
}

@Component({
  selector: 'app-locacoes',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './locacoes.component.html',
  styleUrls: ['./locacoes.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LocacoesComponent implements OnInit {
  clientes: {
    nome: string;
    endereco: string;
    telefone: string;
    itensAlocados: LocacaoEquipamento[];
  }[] = [];

  @ViewChild('modal') modal!: ModalComponent;

  openModal() {
    this.modal.openModal();
  }

  pageSize: number = 10;
  currentPage: number = 1;

  isLoading: boolean = true;

  constructor(private http: HttpClient) {}

  // Inicializada junto ao componente
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
      {
        nome: string;
        endereco: string;
        telefone: string;
        itensAlocados: LocacaoEquipamento[];
      }
    >();

    locacoesEquipamentos.forEach((locEquip) => {
      // Verificando se locacao e cliente existem
      if (locEquip.locacao && locEquip.locacao.cliente) {
        const cliente = locEquip.locacao.cliente;
        const equipamento = locEquip;

        if (!clientesMap.has(cliente.id)) {
          clientesMap.set(cliente.id, {
            nome: cliente.nome,
            endereco: cliente.endereco,
            telefone: cliente.telefone,
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
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Total de páginas com base no tamanho da página
  get totalPages() {
    return Math.ceil(this.clientes.length / this.pageSize);
  }

  exibirDetalhes(cliente: {
    nome: string;
    endereco: string;
    telefone: string;
    itensAlocados: LocacaoEquipamento[];
  }): void {
    const detalhes = `Nome: ${cliente.nome}, 
      \nEndereço: ${cliente.endereco},
      \nTelefone: ${cliente.telefone},
      \nItens Alocados: ${cliente.itensAlocados
        .map((itemAlocado) => itemAlocado.equipamento.nome)
        .join(', ')}`;
    alert(detalhes);
  }

  formatarItensAlocados(itensAlocados: LocacaoEquipamento[]): string {
    return itensAlocados
      .map((itemAlocado) => itemAlocado.equipamento.nome)
      .join(', ');
  }

  jan: any;
  abrirJanela(
    event: MouseEvent,
    cliente: {
      nome: string;
      endereco: string;
      telefone: string;
      itensAlocados: LocacaoEquipamento[];
    }
  ): void {
    const buttonX = event.screenX;
    const buttonY = event.screenY;
    const width = 450;
    const height = 600;
    const left = buttonX + 10;
    const top = buttonY - height / 2;
    this.jan = open(
      '',
      'JanelaSecundaria',
      `menubar=no, scrollbars=no,width=${width},height=${height}, top=${top},left=${left}`
    );
    this.jan.document.write(`
    <html>
      <head>
        <title>Detalhes do Cliente</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 0;
            background-color: #f9f9f9;
          }
          .container {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
          }
          h3 {
            text-align: center;
            margin: 0 0 10px;
            font-size: 16px;
            color: #333;
          }
          p {
            margin: 5px 0;
            line-height: 1.5;
            font-size: 14px;
            color: #555;
          }
          .info-container {
            border: 1px solid #ddd;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            margin: 5px 0;
            padding: 5px 10px;
          }
          .priceTotal {
            margin: 10px 5px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h3>Cliente</h3>
          <p><strong>Nome:</strong> ${cliente.nome}</p>
          <p><strong>Endereço:</strong> ${cliente.endereco}</p>
          <p><strong>Telefone:</strong> ${cliente.telefone}</p>
        </div>

        <div class="container">
          <h3>Itens Alocados</h3>
            ${cliente.itensAlocados
              .map((locacaoEquipamento) => {
                const dataLocacao = new Date(locacaoEquipamento.dataLocacao);
                const dataEntrega = new Date(dataLocacao);
                console.log(dataEntrega);
                dataEntrega.setDate(dataLocacao.getDate() + 4);

                const hoje = new Date();
                const status = hoje > dataEntrega ? 'Em atraso' : 'Normal';

                return `
                <div class="info-container">
                  <p><strong>Nome:</strong> ${
                    locacaoEquipamento.equipamento.nome
                  }</p>
                  <p><strong>Data de Locação:</strong> ${dataLocacao.toLocaleDateString()}</p>
                  <p><strong>Data de Entrega:</strong> ${dataEntrega.toLocaleDateString()}</p>
                  <p><strong>Status:</strong> ${status}</p>
                  <p><strong>Valor:</strong> R$ ${locacaoEquipamento.equipamento.valor.toFixed(
                    2
                  )}</p>
                </div>
                `;
              })
              .join('')}
          <p class="priceTotal"><strong>Valor Total:</strong> R$ ${cliente.itensAlocados
            .reduce(
              (total, locacaoEquipamento) =>
                total + locacaoEquipamento.equipamento.valor,
              0
            )
            .toFixed(2)}</p>
        </div>
      </body>
    </html>
  `);
    this.jan.document.close();
  }
}
