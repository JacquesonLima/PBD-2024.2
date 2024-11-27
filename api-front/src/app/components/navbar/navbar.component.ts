import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  searchText: string = '';

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['login']);
    localStorage.clear();
    alert('Logout feito com sucesso.');
  }

  highlightWords(): void {
    const input = this.searchText.trim();
    const pageContent = document.querySelector('.page-content')!;
    let innerHTML = pageContent.innerHTML;

    innerHTML = innerHTML.replace(/<mark>(.*?)<\/mark>/g, '$1');

    if (input !== '') {
      // Cria uma expressão regular para encontrar correspondências parciais
      const regex = new RegExp(`(${input})`, 'gi');
      innerHTML = innerHTML.replace(regex, '<mark>$1</mark>'); // Adiciona <mark> ao redor das correspondências
    }

    pageContent.innerHTML = innerHTML;
  }
}
