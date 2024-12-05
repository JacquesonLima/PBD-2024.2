import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocacaoService {
  constructor(private http: HttpClient) {}

  // Método para buscar os detalhes da locação
  getLocacaoDetails(): Observable<any> {
    return this.http.get('/locacoes-equipamentos'); // Adapte para o endpoint correto da sua API
  }
}
