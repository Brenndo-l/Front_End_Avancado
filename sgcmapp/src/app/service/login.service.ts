import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private iniciarSessaoUsuario(token: string): void {

    const dados = token.split('.')[1];
    const dadosDecodificados = atob(dados);
    const conteudoToken = JSON.parse(dadosDecodificados);
    const expiracao = conteudoToken.exp * 1000;

    const usuario = <Usuario>{};
    usuario.nomeUsuario = conteudoToken.sub;
    usuario.nomeCompleto = conteudoToken.nomeCompleto;
    usuario.papel = conteudoToken.papel;

    sessionStorage.setItem('token', token);
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    sessionStorage.setItem('expiracao', expiracao.toString());

  }

  login(usuario: Usuario): void {
    const url = environment.API_URL + '/autenticacao';
    this.http.post(url, usuario, { responseType: 'text' }).subscribe({
      next: (token: string) => {
        this.iniciarSessaoUsuario(token);
      },
      complete: () => {
        this.router.navigate(['/']);
      }
    })
  }

  logout(): void{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('expiracao');
    this.router.navigate(['/login']);
  }

  estaLogado(): boolean {
    const token = sessionStorage.getItem('token');
    if (token==null){
      return false;
    }
    const expiracao = sessionStorage.getItem('expiracao');
    const dataExpiracao = new Date(Number(expiracao));
    const agora = new Date();
    const estaExpirado = agora > dataExpiracao;
    if (estaExpirado){
      this.logout();
    }
    return !estaExpirado;
  }

  getCabecalho(requisicao: HttpRequest<any>): HttpRequest<any> {
    const token = sessionStorage.getItem('token');
    if (token){
      return requisicao.clone({
        headers: requisicao.headers.set('Authorization', 'Bearer ' + token)
      });
    }
    return requisicao;
  }

}
