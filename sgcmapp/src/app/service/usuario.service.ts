import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../model/usuario';
import { ICrudService } from './i-crud-service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements ICrudService<Usuario> {

  constructor(
    private http: HttpClient
  ) { }

  apiUrl: string = environment.API_URL + '/config/usuario';
  jsonFileUrl: string = 'assets/json/usuarios.json';

  get(termoBusca?: string): Observable<Usuario[]> {
    // let url = this.apiUrl + '/consultar';
    // if (termoBusca) {
    //   url += '?termoBusca=' + termoBusca;
    // }
    // return this.http.get<Usuario[]>(url);
    return this.http.get<Usuario[]>(this.jsonFileUrl);
  }

  getById(id: number): Observable<Usuario> {
    // let url = this.apiUrl + '/' + id;
    // return this.http.get<Usuario>(url);
    return this.http.get<Usuario[]>(this.jsonFileUrl).pipe(
      map(objetos => objetos.find(a => a.id === id) as Usuario)
    );
  }

  save(objeto: Usuario): Observable<Usuario> {
    // let url = this.apiUrl;
    // if (objeto.id) {
    //   url += '/atualizar';
    //   return this.http.put<Usuario>(url, objeto);
    // } else {
    //   url += '/inserir';
    //   return this.http.post<Usuario>(url, objeto);
    // }
    return of(objeto);
  }

  delete(id: number): Observable<void> {
    // let url = this.apiUrl + '/remover/' + id;
    // return this.http.delete<void>(url);
    return of(undefined);
  }

}
