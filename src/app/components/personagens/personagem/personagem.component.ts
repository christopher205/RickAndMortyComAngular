import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../../../services/Api/api.service';
import { IPersonagem } from '../../../interfaces/Personagem/IPersonagem';
import { RouterModule } from '@angular/router';
import { IUrl } from '../../../interfaces/IUrl';
import { BuscaComponent } from '../../busca/busca.component';
import { BuscaService } from '../../../services/Busca/busca.service';

@Component({
  selector: 'app-personagem',
  standalone: true,
  imports: [RouterModule, BuscaComponent],
  templateUrl: './personagem.component.html',
  styleUrl: './personagem.component.css'
})
export class PersonagemComponent implements OnInit {

  constructor(private service: ApiService, private buscaService : BuscaService){}

  listaPersonagem: IPersonagem[] = []
  listaPersonagemFiltrado: IPersonagem[] = []
  url: string = ''
  carregando : boolean = false

  ngOnInit() {
    this.getData()
    this.filtraLista()
  }

  filtraLista() {
    this.buscaService.textoInputado.subscribe(texto => {
      this.listaPersonagemFiltrado = this.listaPersonagem
      .filter(personagem => personagem.name.toLocaleLowerCase()
      .includes(texto.toLowerCase()))
    })
  }


  getData() {
    this.service.getPersonagens().subscribe({
      next: (data) => {
        this.listaPersonagem = data.personagem
        this.listaPersonagemFiltrado = this.listaPersonagem
        this.url = data.url

      },
      error: (err) => console.log(err)
    })
  }

  getDataPage() {
      this.carregando = true
      setTimeout(() => {
        this.service.getPersonagensPage(this.url).subscribe({
          next: (data) => {
            this.listaPersonagem = [...this.listaPersonagem,...data.personagem]
            this.listaPersonagemFiltrado = this.listaPersonagem
            this.url = data.url
            this.carregando = false

          },
          error: (err) => console.log(err)
        })
      }, 2000)
    }


  @HostListener('window:scroll',['$event'])
  onWindowScroll(event : Event){

    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 5) && !this.carregando) {
      this.getDataPage()
    }
  }

}
