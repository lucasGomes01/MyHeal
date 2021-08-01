import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private authCollection: AngularFirestoreCollection<User>;

  constructor(
    private afa: AngularFireAuth,
    //private afs: AngularFirestore
    ) { 
      //this.authCollection = this.afs.collection<User>('Auth');
    }

  //Aqui é utlizado para armazenar no banco do firebase o ligin. no costrutor o private afa: AngularFireAuth foi adicionado,
// O register abixo é parte do fire base tambem.

  register(user: User) {
    return this.afa.createUserWithEmailAndPassword(user.email, user.password);
  }

  login(user: User) {
    return this.afa.signInWithEmailAndPassword(user.email, user.password);
  }

  logout(){
    return this.afa.signOut();
  }

  getAuth(){
    return this.afa;
  }

}
