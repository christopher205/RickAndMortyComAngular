import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscaService {

  constructor() { }

  private busca = new BehaviorSubject<string>('')
  textoInputado = this.busca.asObservable();

  filtrar(texto : string) {
    this.busca.next(texto);
  }

}
