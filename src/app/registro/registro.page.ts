import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComparacaoValidator } from '../validators/comparacao-validator';
import { CpfValidator } from '../validators/cpf-validator';

@Component({
  selector: 'app-registro',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss'],
})
export class RegistroPage {

  public formRegistro: FormGroup;

  public mensagens_validacao = {
    nome: [
      {tipo: 'required', mensagem: 'Nome obrigatório!'},
      {tipo: 'minLength', mensagem: 'O nome deve ter pelo menos 3 caracteres!'}

    ],
    cpf: [
      {tipo: 'required', mensagem: 'CPF obrigatório!' },
      {tipo: 'minlength', mensagem: 'O CPF deve ter pelo menos 11 caracteres!'},
      {tipo: 'maxlength', mensagem: 'O CPF deve ter no máximo 14 caracteres!'},
      {tipo: 'invalido', mensagem: 'CPF inválido!'}
    ],
    dataNascimento: [
      {tipo: 'required', mensagem: 'Data de Nascimento obrigatória!'}

    ],
    genero: [
      {tipo: 'required', mensagem: 'Escolha um gênero!'}

    ],
    celular: [
      {tipo: 'required', mensagem: 'Celular obrigatório !'},
      {tipo: 'minlength', mensagem: 'O celular deve ter pelo menos 10 caracteres!'},
      {tipo: 'maxlength', mensagem: 'O celular no máximo deve ter 16 caracteres!'}

    ],
    email: [
      {tipo: 'required', mensagem: 'E-mail obrigatório!'},
      {tipo: 'email', mensagem: 'E-mail inválido!'}

    ],
    senha: [
      {tipo: 'required', mensagem: 'Senha obrigatória!' },
      {tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres!'}
    ],
    confirmaSenha: [
      {tipo: 'required', mensagem: 'Obrigatório confirmar a senha!' },
      {tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres!'},
      {tipo: 'comparacao', mensagem: 'Deve ser igual a senha!'}
    ]
  };

  constructor(private formBuilder: FormBuilder) {

    this.formRegistro = formBuilder.group({

      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf: ['', Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(14),
        CpfValidator.cpfValido
      ])],
      dataNascimento: ['', Validators.compose([Validators.required])],
      genero: ['', Validators.compose([Validators.required])],
      celular: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(16), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmaSenha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]

    }, {
      validator: ComparacaoValidator('senha', 'confirmaSenha')
    });
  }

}
