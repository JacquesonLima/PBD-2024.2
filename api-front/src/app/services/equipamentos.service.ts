import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

<<<<<<< HEAD
export interface Equipamento {
=======
interface Equipamento {
>>>>>>> 15e1c61806be4c8c3386d8fb7b3ee7791a413c3b
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

  listarTodos(): Observable<Equipamento[]> {
    const token = localStorage.getItem('auth-token') || ''; // Garante um valor padrão
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Equipamento[]>(this.apiUrl, { headers });
  }
}
