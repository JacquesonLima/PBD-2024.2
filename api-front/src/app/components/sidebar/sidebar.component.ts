import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Output() changeComponent = new EventEmitter<string>(); // Evento para emitir o nome do componente

  // Funções que emitem o nome do componente a ser exibido
  onEquipamentosClick() {
    this.changeComponent.emit('equipamentos');
  }

  onUsuariosClick() {
    this.changeComponent.emit('usuarios');
  }

  onLocacoesClick() {
    this.changeComponent.emit('locacoes');
  }
}
