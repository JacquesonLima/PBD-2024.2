import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { EquipamentosComponent } from '../equipamentos/equipamentos.component';
import { LocacoesComponent } from '../locacoes/locacoes.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-core',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    EquipamentosComponent,
    LocacoesComponent,
    UsuariosComponent,
    CommonModule,
  ],
  templateUrl: './core.component.html',
  styleUrl: './core.component.css',
})
export class CoreComponent {
  activeComponent: string = ''; // Componente inicial

  onComponentChange(componentName: string) {
    this.activeComponent = componentName;
  }
}
