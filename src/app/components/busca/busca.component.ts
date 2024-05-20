import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormControlName, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BuscaService } from '../../services/Busca/busca.service';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.css'
})
export class BuscaComponent implements OnInit {

  constructor(private service : BuscaService) {}

  input : FormControl = new FormControl('')

  ngOnInit() {
  this.input.valueChanges.subscribe(data => {
    this.service.filtrar(data)
  })
  }

  filtraLista() {
    const valor = this.input?.value
    this.service.filtrar(valor)
  }

}
0
