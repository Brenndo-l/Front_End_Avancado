import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Paciente } from '../model/paciente';
import { ICrudService } from './i-crud-service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService implements ICrudService<Paciente> {

  constructor(
    private http: HttpClient
  ) { }

  apiUrl: string = environment.API_URL + '/paciente';
  jsonFileUrl: string = 'assets/json/pacientes.json';

  get(termoBusca?: string): Observable<Paciente[]> {
    // let url = this.apiUrl + '/consultar';
    // if (termoBusca) {
    //   url += '?termoBusca=' + termoBusca;
    // }
    // return this.http.get<Paciente[]>(url);
    return this.http.get<Paciente[]>(this.jsonFileUrl);
  }

  getById(id: number): Observable<Paciente> {
    // let url = this.apiUrl + '/' + id;
    // return this.http.get<Paciente>(url);
    return this.http.get<Paciente[]>(this.jsonFileUrl).pipe(
      map(objetos => objetos.find(a => a.id === id) as Paciente)
    );
  }

  save(objeto: Paciente): Observable<Paciente> {
    // let url = this.apiUrl;
    // if (objeto.id) {
    //   url += '/atualizar';
    //   return this.http.put<Paciente>(url, objeto);
    // } else {
    //   url += '/inserir';
    //   return this.http.post<Paciente>(url, objeto);
    // }
    return of(objeto);
  }

  delete(id: number): Observable<void> {
    // let url = this.apiUrl + '/remover/' + id;
    // return this.http.delete<void>(url);
    return of(undefined);
  }

}
