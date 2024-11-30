import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Unidade } from '../model/unidade';
import { ICrudService } from './i-crud-service';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService implements ICrudService<Unidade> {

  constructor(
    private http: HttpClient
  ) { }

  apiUrl: string = environment.API_URL + '/config/unidade';
  jsonFileUrl: string = 'assets/json/unidades.json';

  get(termoBusca?: string): Observable<Unidade[]> {
    // let url = this.apiUrl + '/consultar';
    // if (termoBusca) {
    //   url += '?termoBusca=' + termoBusca;
    // }
    // return this.http.get<Unidade[]>(url);
    return this.http.get<Unidade[]>(this.jsonFileUrl);
  }

  getById(id: number): Observable<Unidade> {
    // let url = this.apiUrl + '/' + id;
    // return this.http.get<Unidade>(url);
    return this.http.get<Unidade[]>(this.jsonFileUrl).pipe(
      map(objetos => objetos.find(a => a.id === id) as Unidade)
    );
  }

  save(objeto: Unidade): Observable<Unidade> {
    // let url = this.apiUrl;
    // if (objeto.id) {
    //   url += '/atualizar';
    //   return this.http.put<Unidade>(url, objeto);
    // } else {
    //   url += '/inserir';
    //   return this.http.post<Unidade>(url, objeto);
    // }
    return of(objeto);
  }

  delete(id: number): Observable<void> {
    // let url = this.apiUrl + '/remover/' + id;
    // return this.http.delete<void>(url);
    return of(undefined);
  }

}
