import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente, ClienteService } from '../../services/cliente.service';
import {
  Equipamento,
  EquipamentosService,
} from '../../services/equipamentos.service';

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
  equipamentoSelecionado: String | null = null;
  quantidade = 1;
  dataEntrega = '';
  local = '';

  // Estado para controlar o conteúdo do modal
  modalContent: 'locacao' | 'cadastroCliente' | 'cadastroEquipamento' =
    'locacao';

  // Dados do novo cliente
  novoCliente = {
    nome: '',
    endereco: '',
    telefone: '',
  };

  novoEquipamento = {
    nome: '',
    tipo: '',
    quantidade: '',
    valor: '',
  };

  @Output() modalClosed = new EventEmitter<void>();

  constructor(
    private clienteService: ClienteService,
    private equipamentoService: EquipamentosService
  ) {}

  ngOnInit() {
    this.equipamentoService.listarTodos().subscribe({
      next: (data) => {
        this.equipamentos = data;
      },
      error: (err) => {
        console.error('Erro ao carregar equipamentos:', err);
      },
    });
  }

  openModal() {
    this.isOpen = true;
    this.modalContent = 'locacao'; // Sempre abrir no conteúdo de locação
  }

  closeModal() {
    this.isOpen = false;
    this.modalClosed.emit();
    this.limparCampos();
  }

  buscarCliente(): void {
    if (!this.termoBuscaCliente.trim()) {
      alert('Digite um nome ou CPF para buscar.');
      return;
    }

    this.clienteService.buscarCliente(this.termoBuscaCliente).subscribe({
      next: (cliente) => {
        this.clienteEncontrado = cliente;
      },
      error: () => {
        this.clienteEncontrado = null;
        alert('Cliente não encontrado.');
      },
    });
  }

  abrirModalCadastroEquipamento() {
    this.modalContent = 'cadastroEquipamento';
  }

  abrirModalCadastroCliente() {
    this.modalContent = 'cadastroCliente'; // Alternar para o formulário de cadastro de cliente
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

  cadastrarEquipamento() {}

  salvarLocacao() {
    const locacao = {
      cliente: this.clienteEncontrado,
      equipamento: this.equipamentos.find(
        (e) => e.nome === this.equipamentoSelecionado
      ),
      quantidade: this.quantidade,
      dataEntrega: this.dataEntrega,
      local: this.local,
    };
    console.log('Locação salva:', locacao);
    this.closeModal();
  }

  limparCampos() {
    this.clienteEncontrado = null;
    this.termoBuscaCliente = '';
  }
}
