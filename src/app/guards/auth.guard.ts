import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private AuthService: AuthService,
    private Router: Router 
  ){ }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.AuthService.getAuth().onAuthStateChanged(user => {
        if (!user) this.Router.navigate(['login']);

        resolve(user ? true : false);
      } )
    });
  }
}
