import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Locacao {
  id?: number;
  cliente: Cliente;
  equipamento: Equipamento;
  dataLocacao: string;
}

export interface Cliente {
  nome: string;
  endereco: string;
  telefone: string;
}

export interface Equipamento {
  nome: string;
  tipo: string;
  quantidade: number;
  valor: number;
  totalAlocacoes: number;
}

export interface LocacaoEquipamento {
  locacao: { id: number | undefined };
  equipamento: Equipamento;
  dataLocacao: string;
}

@Injectable({
  providedIn: 'root',
})
export class LocacaoEquipamentoService {
  private apiUrl = 'http://localhost:8080/locacoes-equipamentos';

  constructor(private http: HttpClient) {}

  salvarLocacaoEquipamento(
    locacaoEquipamento: LocacaoEquipamento
  ): Observable<LocacaoEquipamento> {
    if (!locacaoEquipamento.locacao.id) {
      console.error(
        'Erro: A locação precisa ter um ID antes de ser salva em LocacaoEquipamento.'
      );
      throw new Error('A locação precisa ter um ID válido.');
    }

    return this.http.post<LocacaoEquipamento>(this.apiUrl, locacaoEquipamento);
  }
}
