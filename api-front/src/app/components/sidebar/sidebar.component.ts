import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Output() changeComponent = new EventEmitter<string>(); // Evento para emitir o nome do componente

  activeComponent: string = 'equipamentos'; // Define o componente ativo inicialmente

  setActiveComponent(component: string): void {
    this.activeComponent = component; // Atualiza o componente ativo ao clicar
    this.changeComponent.emit(component);
  }
}
