import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { User } from './../models/user';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formLogin: FormGroup;
  public UserLogin: User = {};
  public UId = {};

  public user: any={};

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

  constructor(
    private formBuilder: FormBuilder, 
    private router           : Router, 
    private usuarioService   : UsuariosService, 
    public  toastController  : ToastController,
    public  alertController  : AlertController,
    private AuthService: AuthService

    ) { 
    this.formLogin = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      manterLogado: [false]
    })
  }

  ngOnInit() {
  }


  async ionViewWillEnter(){
    const usuarioLogado = await this.usuarioService.buscarUsuarioLogado();
    if(usuarioLogado && usuarioLogado.manterLogado){
      this.router.navigateByUrl('/home');
      this.presentToast();

    }

  }

  public async login(){

    try{
      const user = await this.AuthService.login(this.UserLogin);
      user.user.uid;
      this.UId = user.user.uid;
    } catch(error) {
      console.error(error);
    }

    //teste de login
    if(this.formLogin.valid){

    const usuario = await this.usuarioService.login(this.formLogin.value.email, this.formLogin.value.senha);
    if(usuario){
      usuario.manterLogado = this.formLogin.value.manterLogado;
      this.usuarioService.salvarUsuarioLogado(usuario);
      this.router.navigateByUrl('/home')
      this.presentToast();
    }else{
      this.presentAlert('ADVERTÊNCIA!', 'Usuário ou senha inválidos!');
    }
    }else{
      this.presentAlert('ERRO!', 'Formulário inválido, confira os campos!');
    }
  }

  async presentToast(){
    const toast = await this.toastController.create({
      message: 'Login efetuado com sucesso!',
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });
  }

}
