import { IPersonagemDetalhe } from '../../interfaces/Personagem/IPersonagemDetalhe';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, map } from 'rxjs';
import { IEpisodioDetalhe } from '../../interfaces/Episodio/IEpisodioDetalhe';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  readonly url : string = 'https://rickandmortyapi.com/api/'

  getPersonagens() {
    return this.http.get<any>(this.url+'character').pipe(
      map(data =>  ({
        personagem: data.results.map((item : any) =>({
          name: item.name,
          image: item.image,
          id: item.id
        })),
        url: data.info.next
      })
    ))
  }

  getPersonagensPage(url : string) {
    if(url === ''){
      return EMPTY;
    }
    return this.http.get<any>(url).pipe(
      map(data =>  ({
        personagem: data.results.map((item : any) =>({
          name: item.name,
          image: item.image,
          id: item.id
        })),
        url: data.info.next === null ? '' : data.info.next

      })
    ))
  }

  getPersonagensDetalhe(id : string) {
    return this.http.get<any>(this.url+'character/'+ id).pipe(
      map(data => ([
        {
          id: data.id,
          name: data.name,
          status: data.status,
          especie: data.species,
          tipo: data.type,
          genero: data.gender,
          origem: data.origin.name,
          cidade: data.location.name,
          image: data.image,
          criado: data.created,
        } as IPersonagemDetalhe
      ]))
    )
  }

  getEpisodios() {
    return this.http.get<any>(this.url+'episode').pipe(
      map(data =>  ({
        episodio: data.results.map((item : any) =>({
          id: item.id,
          name: item.name,
          airDate: item.air_date
        })),
        url: data.info.next
      })
    ))
  }

  getEpisodiosPage(url : string) {
    if(url === ''){
      return EMPTY;
    }
    return this.http.get<any>(url).pipe(
      map(data =>  ({
        episodio: data.results.map((item : any) =>({
          id: item.id,
          name: item.name,
          data: item.air_date
        })),
        url: data.info.next === null ? '' : data.info.next

      })
    ))
  }

  getEpisodioDetalhe(id : string) {
    return this.http.get<any>(this.url+'episode/'+ id).pipe(
      map(data => ([
        {
          id: data.id,
          name: data.name,
          data: data.air_date,
          episodio: data.episode,
          criado: data.created

        } as IEpisodioDetalhe
      ]))
    )
  }
}
