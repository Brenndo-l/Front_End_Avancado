import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Convenio } from '../model/convenio';
import { ICrudService } from './i-crud-service';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService implements ICrudService<Convenio> {

  constructor(
    private http: HttpClient
  ) { }

  apiUrl: string = environment.API_URL + '/convenio';
  jsonFileUrl: string = 'assets/json/convenios.json';

  get(termoBusca?: string): Observable<Convenio[]> {
    // let url = this.apiUrl + '/consultar';
    // if (termoBusca) {
    //   url += '?termoBusca=' + termoBusca;
    // }
    // return this.http.get<Convenio[]>(url);
    return this.http.get<Convenio[]>(this.jsonFileUrl);
  }

  getById(id: number): Observable<Convenio> {
    // let url = this.apiUrl + '/' + id;
    // return this.http.get<Convenio>(url);
    return this.http.get<Convenio[]>(this.jsonFileUrl).pipe(
      map(objetos => objetos.find(a => a.id === id) as Convenio)
    );
  }

  save(objeto: Convenio): Observable<Convenio> {
    // let url = this.apiUrl;
    // if (objeto.id) {
    //   url += '/atualizar';
    //   return this.http.put<Convenio>(url, objeto);
    // } else {
    //   url += '/inserir';
    //   return this.http.post<Convenio>(url, objeto);
    // }
    return of(objeto);
  }

  delete(id: number): Observable<void> {
    // let url = this.apiUrl + '/remover/' + id;
    // return this.http.delete<void>(url);
    return of(undefined);
  }

}
