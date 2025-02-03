import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  endereco: string;
  telefone: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) {}

  buscarCliente(termo: string): Observable<Cliente> {
    const params = new HttpParams().set('termo', termo);
    return this.http.get<Cliente>(`${this.apiUrl}/buscar`, { params });
  }
}
