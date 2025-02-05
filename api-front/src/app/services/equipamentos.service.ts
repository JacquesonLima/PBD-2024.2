import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Equipamento {
  nome: string;
  tipo: string;
  quantidade: number;
  valor: number;
  totalAlocacoes: number;
}

@Injectable({
  providedIn: 'root',
})
export class EquipamentosService {
  apiUrl: string = 'http://localhost:8080/equipamentos';

  constructor(private http: HttpClient) {}

  cadastrarEquipamento(equipamento: Equipamento): Observable<Equipamento> {
    return this.http.post<Equipamento>(this.apiUrl, equipamento);
  }

  listarTodos(): Observable<Equipamento[]> {
    const token = localStorage.getItem('auth-token') || ''; // Garante um valor padrão
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Equipamento[]>(this.apiUrl, { headers });
  }
}
