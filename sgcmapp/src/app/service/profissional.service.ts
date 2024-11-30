import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Profissional } from '../model/profissional';
import { ICrudService } from './i-crud-service';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService implements ICrudService<Profissional> {

  constructor(
    private http: HttpClient
  ) { }

  apiUrl: string = environment.API_URL + '/profissional';
  jsonFileUrl: string = 'assets/json/profissionais.json';

  get(termoBusca?: string): Observable<Profissional[]> {
    // let url = this.apiUrl + '/consultar';
    // if (termoBusca) {
    //   url += '?termoBusca=' + termoBusca;
    // }
    // return this.http.get<Profissional[]>(url);
    return this.http.get<Profissional[]>(this.jsonFileUrl);
  }

  getById(id: number): Observable<Profissional> {
    // let url = this.apiUrl + '/' + id;
    // return this.http.get<Profissional>(url);
    return this.http.get<Profissional[]>(this.jsonFileUrl).pipe(
      map(objetos => objetos.find(a => a.id === id) as Profissional)
    );
  }

  save(objeto: Profissional): Observable<Profissional> {
    // let url = this.apiUrl;
    // if (objeto.id) {
    //   url += '/atualizar';
    //   return this.http.put<Profissional>(url, objeto);
    // } else {
    //   url += '/inserir';
    //   return this.http.post<Profissional>(url, objeto);
    // }
    return of(objeto);
  }

  delete(id: number): Observable<void> {
    // let url = this.apiUrl + '/remover/' + id;
    // return this.http.delete<void>(url);
    return of(undefined);
  }

}
