import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PersonagemComponent } from './components/personagens/personagem/personagem.component';
import { EpisodioComponent } from './components/episodios/episodio/episodio.component';
import { PersonagemDetalheComponent } from './components/personagens/personagem-detalhe/personagem-detalhe.component';
import { EpisodioDetalheComponent } from './components/episodios/episodio-detalhe/episodio-detalhe.component';
import { LoginComponent } from './components/login/login/login.component';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [

  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent, canActivate: [authGuard],
    children: [
      {
        path: 'personagem', component: PersonagemComponent, canActivate: [authGuard],
      },
      {
        path: 'episodio', component: EpisodioComponent, canActivate: [authGuard]
      },
      {
        path: 'detalhesPersonagem/:id', component: PersonagemDetalheComponent, canActivate: [authGuard]
      },
      {
        path: 'detalhesEpisodio/:id', component: EpisodioDetalheComponent, canActivate: [authGuard]
      },
    ]
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  // {
  //   path: 'personagem', component: PersonagemComponent, canActivate: [authGuard]
  // },
  // {
  //   path: 'episodio', component: EpisodioComponent, canActivate: [authGuard]
  // },
  // {
  //   path: 'detalhesPersonagem/:id', component: PersonagemDetalheComponent, canActivate: [authGuard]
  // },
  // {
  //   path: 'detalhesEpisodio/:id', component: EpisodioDetalheComponent, canActivate: [authGuard]
  // },
  { path: '**', redirectTo: '/login' }
];
