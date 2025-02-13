import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocacaoService {
  apiUrl: string = 'http://localhost:8080/locacoes';

  constructor(private http: HttpClient) {}

  salvarLocacao(locacao: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, locacao);
  }
}
