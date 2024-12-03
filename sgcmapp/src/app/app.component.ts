import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';

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
    private router: Router
  ) {
    router.events.subscribe(evento => {
      if (evento instanceof NavigationEnd) {
        this.paginaAtual = evento.url;
      }
    });
  }
}
