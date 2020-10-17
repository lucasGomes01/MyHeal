import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formLogin: FormGroup;

  public mensagens_validacao = {
    email: [
      {tipo: 'required', mensagem: 'E-mail obrigatório!'},
      {tipo: 'email', mensagem: 'E-mail inválido!'}

    ],
    senha: [
      {tipo: 'required', mensagem: 'Senha obrigatória!' },
      {tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres!'}
    ]
  };

  constructor(private formBuilder: FormBuilder) { 
    this.formLogin = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }

  ngOnInit() {
  }

  public login(){
    if(this.formLogin.valid){
      console.log('formulário válido!');
    }else{
      console.log('formulário inválido.')

    }
  }

}
