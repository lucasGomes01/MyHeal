import { AuthService } from './../services/auth.service';
import { User } from './../models/user';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuariosService } from '../services/usuarios.service';
import { ComparacaoValidator } from '../validators/comparacao-validator';
import { CpfValidator } from '../validators/cpf-validator';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-registro',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss'],
})
export class RegistroPage {

  public formRegistro: FormGroup;
  

  // no contrutor adicionado private ArmazenamentoService: ArmazenamentoService para o firebase
  // o async register() foi removido e foi aproveitado o botão salvardados

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

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    public alertController: AlertController,
    public router: Router,
    private AuthService: AuthService,
    private afs: AngularFirestore,

    ) {

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

  ngOnInit() {
    this.usuariosService.buscarTodos();
    console.log(this.usuariosService.listaUsuarios);
    
  }

  public async salvarFormulario(){

    if(this.formRegistro.valid){

      let user  = new User();
      user.name = this.formRegistro.value.nome;
      user.cpf = this.formRegistro.value.cpf;
      user.birthDate = new Date(this.formRegistro.value.dataNascimento);
      user.genero = this.formRegistro.value.genero;
      user.phoneNumber = this.formRegistro.value.celular;
      user.email = this.formRegistro.value.email;
      user.password = this.formRegistro.value.senha;

      //envia para o fireBase
      try{
        const newUser = await this.AuthService.register(user);
        const newUserObject = Object.assign({}, user);

        delete newUserObject.password;

        await this.afs.collection('Users').doc(newUser.user.uid).set(newUserObject);
        
        this.exibirAlerta('SUCESSO!', 'Usuário salvo com sucesso!');
        this.router.navigateByUrl('/login');
      } catch(error) {
        this.exibirAlerta('ERRO!', 'Erro ao salvar o usuário!');
        console.error(error)
      }

    }else{
      this.exibirAlerta('ADVERTÊNCIA!', 'Formulário inválido<br/>Verifique os campos do seu formulário!');

    }
  }

  async exibirAlerta(titulo: string, mensagem: string){
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }
}
