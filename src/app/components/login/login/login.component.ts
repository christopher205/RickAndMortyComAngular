import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router : Router) {}

  FormLogin! : FormGroup
  mensagem? : string
  readonly fakeToken = "d142fb0e-d6d1-44fb-a716-15da41569ea0"

  ngOnInit() {
    this.validarForm()
  }

  validarForm() {
    this.FormLogin = this.formBuilder.group({
      nome: [''],
      email: ['', Validators.required],
      senha: ['', Validators.required],
    })
    console.log(this.FormLogin)
  }

  onSubmit() {

    const email : string = this.FormLogin.controls['email']?.value
    const senha : string = this.FormLogin.controls['senha']?.value
    const nome : string = this.FormLogin.controls['nome']?.value

    if(this.auth.estaAutenticado(email, senha)) {
      this.auth.setInfos(email, senha, nome, true)
      localStorage.setItem('token', this.fakeToken)
      this.router.navigate(['/home'])
    }
    else {
      this.mensagem = 'Usuario ou senha Invalidos'
    }

  }
}
