import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente, ClienteService } from '../../services/cliente.service';
import {
  Equipamento,
  EquipamentosService,
} from '../../services/equipamentos.service';
import { LocacaoEquipamentoService } from '../../services/locacao-equipamento.service';
import { LocacaoService } from '../../services/locacao.service';

export interface Locacao {
  id?: number;
  cliente: Cliente;
  equipamento: Equipamento;
  dataLocacao: string;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
  isOpen = false;
  termoBuscaCliente = '';
  clienteEncontrado: Cliente | null = null;
  equipamentos: Equipamento[] = [];
  equipamentoSelecionado: string | null = null;
  dataLocacao = '';
  locacao: Locacao | null = null;

  modalContent: 'locacao' | 'cadastroCliente' | 'cadastroEquipamento' =
    'locacao';

  novoCliente = { nome: '', endereco: '', telefone: '' };

  novoEquipamento = {
    nome: '',
    tipo: '',
    quantidade: 0,
    valor: 0,
    totalAlocacoes: 0,
  };

  @Output() modalClosed = new EventEmitter<void>();

  constructor(
    private locacaoService: LocacaoService,
    private clienteService: ClienteService,
    private equipamentoService: EquipamentosService,
    private locacaoEquipamentoService: LocacaoEquipamentoService
  ) {}

  ngOnInit() {
    this.equipamentoService.listarTodos().subscribe({
      next: (data) => (this.equipamentos = data),
      error: (err) => console.error('Erro ao carregar equipamentos:', err),
    });
  }

  openModal() {
    this.isOpen = true;
    this.modalContent = 'locacao';
  }

  closeModal() {
    this.isOpen = false;
    this.modalClosed.emit();
    this.limparCampos();
  }

  cadastrarCliente() {
    this.clienteService.cadastrarCliente(this.novoCliente).subscribe({
      next: (response) => {
        console.log('Cliente cadastrado:', response);
        alert('Cliente cadastrado com sucesso!');
        this.novoCliente = { nome: '', endereco: '', telefone: '' };
        this.modalContent = 'locacao';
      },
      error: () => {
        alert('Erro ao cadastrar cliente.');
      },
    });
  }

  abrirModalCadastroCliente() {
    this.modalContent = 'cadastroCliente';
  }

  cadastrarEquipamento() {
    this.equipamentoService
      .cadastrarEquipamento(this.novoEquipamento)
      .subscribe({
        next: (response) => {
          console.log('Equipamento cadastrado', response);
          alert('Equipamento cadastrado com sucesso');
          this.novoEquipamento = {
            nome: '',
            tipo: '',
            quantidade: 0,
            valor: 0,
            totalAlocacoes: 0,
          };
          this.modalContent = 'locacao';
          this.ngOnInit();
        },
        error: () => {
          alert('Erro ao cadastrar equipamento.');
        },
      });
  }

  abrirModalCadastroEquipamento() {
    this.modalContent = 'cadastroEquipamento';
  }

  buscarCliente() {
    if (!this.termoBuscaCliente.trim()) {
      alert('Digite um nome para buscar.');
      return;
    }
    this.clienteService.buscarCliente(this.termoBuscaCliente).subscribe({
      next: (cliente) => (this.clienteEncontrado = cliente),
      error: () => {
        this.clienteEncontrado = null;
        alert('Cliente não encontrado.');
      },
    });
  }

  async salvarLocacao(): Promise<Locacao> {
    if (!this.clienteEncontrado) {
      alert('Selecione um cliente antes de cadastrar a locação.');
      throw new Error('Cliente não encontrado');
    }

    const novaLocacao = {
      cliente: this.clienteEncontrado,
      equipamento: this.equipamentos.find(
        (e) => e.nome === this.equipamentoSelecionado
      ),
      dataLocacao: this.dataLocacao,
    };

    return new Promise((resolve, reject) => {
      this.locacaoService.salvarLocacao(novaLocacao).subscribe({
        next: (response) => {
          console.log('Locação cadastrada:', response);
          resolve(response);
        },
        error: (err) => {
          console.error('Erro ao cadastrar locação:', err);
          alert('Erro ao cadastrar locação.');
          reject(err);
        },
      });
    });
  }

  async cadastrarLocacaoEquipamento() {
    try {
      const locacaoSalva = await this.salvarLocacao();

      if (!this.equipamentoSelecionado) {
        alert('Selecione um equipamento antes de cadastrar a locação.');
        return;
      }

      const equipamentoSelecionado = this.equipamentos.find(
        (e) => e.nome === this.equipamentoSelecionado
      );

      if (!equipamentoSelecionado) {
        alert('Equipamento não encontrado.');
        return;
      }

      const locacaoEquipamento = {
        locacao: { id: locacaoSalva.id },
        equipamento: equipamentoSelecionado,
        dataLocacao: this.dataLocacao,
      };

      this.locacaoEquipamentoService
        .salvarLocacaoEquipamento(locacaoEquipamento)
        .subscribe({
          next: (response) => {
            console.log('Locação de equipamento cadastrada:', response);
            alert('Locação de Equipamento cadastrada com sucesso!');
            this.modalContent = 'locacao';
            this.ngOnInit();
            this.closeModal();
          },
          error: (err) => {
            console.error('Erro ao cadastrar locação:', err);
            alert('Erro ao cadastrar locação de equipamento.');
          },
        });
    } catch (error) {
      console.error('Erro ao salvar locação:', error);
    }
  }

  limparCampos() {
    this.clienteEncontrado = null;
    this.termoBuscaCliente = '';
    this.equipamentoSelecionado = null;
    this.dataLocacao = '';
  }
}
