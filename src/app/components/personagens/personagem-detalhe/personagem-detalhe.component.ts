import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/Api/api.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IPersonagemDetalhe } from '../../../interfaces/Personagem/IPersonagemDetalhe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-personagem-detalhe',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './personagem-detalhe.component.html',
  styleUrl: './personagem-detalhe.component.css'
})
export class PersonagemDetalheComponent implements OnInit {

  constructor(private service: ApiService, private route : ActivatedRoute){}

  listaPersonagemDetalhe : IPersonagemDetalhe[] = []

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') as string

      this.getDetalhes(id)
    })
  }

  getDetalhes(id: string) {

    this.service.getPersonagensDetalhe(id).subscribe({
      next: (data) => {
        this.listaPersonagemDetalhe = data

      },
      error: (err) => console.log(err)
    })

  }


}
