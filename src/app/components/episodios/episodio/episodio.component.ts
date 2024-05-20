import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../../../services/Api/api.service';
import { IEpisodio } from '../../../interfaces/Episodio/IEpisodio';
import { RouterModule } from '@angular/router';
import { BuscaComponent } from '../../busca/busca.component';
import { BuscaService } from '../../../services/Busca/busca.service';

@Component({
  selector: 'app-episodio',
  standalone: true,
  imports: [RouterModule, BuscaComponent],
  templateUrl: './episodio.component.html',
  styleUrl: './episodio.component.css'
})
export class EpisodioComponent implements OnInit {

  constructor(private service: ApiService, private buscaService : BuscaService){}

  listaEpisodio : IEpisodio[] = []
  listaEpisodioFiltrado : IEpisodio[] = []
  url: string = ''
  carregando : boolean = false

  ngOnInit() {
    this.getData()
    this.filtraLista()
  }

  filtraLista() {
    this.buscaService.textoInputado.subscribe(texto => {
      this.listaEpisodioFiltrado = this.listaEpisodio
      .filter(episodio => episodio.name.toLocaleLowerCase()
      .includes(texto.toLowerCase()))
    })
  }

  getData() {
    this.service.getEpisodios().subscribe({
      next: (data) => {
        this.listaEpisodio = data.episodio
        this.listaEpisodioFiltrado = this.listaEpisodio
        this.url = data.url

      },
      error: (err) => console.log(err)
    })
  }

  getDataPage() {
    this.carregando = true
    this.service.getEpisodiosPage(this.url).subscribe({
      next: (data) => {
        this.listaEpisodio = [...this.listaEpisodio,...data.episodio]
        this.listaEpisodioFiltrado = this.listaEpisodio
        this.url = data.url
        this.carregando = false

      },
      error: (err) => console.log(err)
    })
  }

  @HostListener('window:scroll',['$event'])
  onWindowScroll(event : Event){

    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 5) && !this.carregando) {
      this.getDataPage()
    }
  }
}
