import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SGCM';
  paginaAtual = '';

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    router.events.subscribe(evento => {
      if (evento instanceof NavigationEnd) {
        this.paginaAtual = evento.url;
      }
    });
  }

  logout(): void {
    this.loginService.logout();
  }

}