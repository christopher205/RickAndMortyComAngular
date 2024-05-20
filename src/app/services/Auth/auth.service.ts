import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  readonly fakePassword: string = 'admin123'
  readonly fakeEmail: string = 'teste@gmail.com'
  email : string = ''
  senha : string = ''
  nome : string = ''
  isAuth : boolean = false


  estaAutenticado(email: string, password: string) {

    if (email === this.fakeEmail && password === this.fakePassword) {
      return true;
    }
      return false;
  }

  logout() {
    localStorage.removeItem('token')
  }

  autenticado() {
    return this.isAuth
  }

  setInfos(email: string, senha: string, nome : string, auth : boolean) {
    this.email = email
    this.senha = senha
    this.nome = nome
    this.isAuth = auth
  }

  getInfos() {
    return {
      email: this.email,
      senha: this.senha,
      nome: this.nome,
      auth: this.isAuth
    }
  }
}
