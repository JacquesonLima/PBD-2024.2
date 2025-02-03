import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente, ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  isOpen = false;
  termoBuscaCliente = '';
  clienteEncontrado: Cliente | null = null;
  equipamentos = [
    { id: 1, nome: 'Projetor' },
    { id: 2, nome: 'Notebook' },
  ];
  equipamentoSelecionado: number | null = null;
  quantidade = 1;
  dataEntrega = '';
  local = '';

  // Estado para controlar o conteúdo do modal
  modalContent: 'locacao' | 'cadastroCliente' = 'locacao';

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

  constructor(private clienteService: ClienteService) {}

  openModal() {
    this.isOpen = true;
    this.modalContent = 'locacao'; // Sempre abrir no conteúdo de locação
  }

  closeModal() {
    this.isOpen = false;
    this.modalClosed.emit();
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

  abrirModalCadastroCliente() {
    this.modalContent = 'cadastroCliente'; // Alternar para o formulário de cadastro de cliente
  }

  cadastrarCliente() {
    console.log('Cliente cadastrado:', this.novoCliente);
    // Aqui você pode integrar com uma API para salvar o cliente
    this.novoCliente = { nome: '', endereco: '', telefone: '' }; // Limpar formulário
    this.modalContent = 'locacao'; // Voltar para o conteúdo de locação após cadastrar
  }

  salvarLocacao() {
    const locacao = {
      cliente: this.clienteEncontrado,
      equipamento: this.equipamentos.find(
        (e) => e.id === this.equipamentoSelecionado
      ),
      quantidade: this.quantidade,
      dataEntrega: this.dataEntrega,
      local: this.local,
    };
    console.log('Locação salva:', locacao);
    this.closeModal();
  }
}
