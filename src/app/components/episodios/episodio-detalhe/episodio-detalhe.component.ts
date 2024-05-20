import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/Api/api.service';
import { IEpisodioDetalhe } from '../../../interfaces/Episodio/IEpisodioDetalhe';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-episodio-detalhe',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './episodio-detalhe.component.html',
  styleUrl: './episodio-detalhe.component.css'
})
export class EpisodioDetalheComponent implements OnInit {

  constructor(private service: ApiService, private route : ActivatedRoute) {}

  listaEpisodioDetalhe : IEpisodioDetalhe[] = []

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') as string
      this.getDetalhes(id)

    })
  }

  getDetalhes(id: string) {

    this.service.getEpisodioDetalhe(id).subscribe({
      next: (data) => {
        this.listaEpisodioDetalhe = data
      },
      error: (err) => console.log(err)
    })
  }

}
