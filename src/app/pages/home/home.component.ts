import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PersonagemComponent } from '../../components/personagens/personagem/personagem.component';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, PersonagemComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private service : AuthService) {}

  usuario : string = ''

  ngOnInit() {
    this.getNome()
  }

  getNome() {
    this.usuario = this.service.getInfos().nome
  }

  logout() {
    this.service.logout();
  }
}
