import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Equipamento {
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
    return this.http.get<Equipamento[]>(this.apiUrl);
  }
}
