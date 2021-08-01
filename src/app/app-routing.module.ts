import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule), canActivate: [LoginGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)/*, canActivate: [LoginGuard]*/
  },
  {
    path: 'produto/:id',
    
    loadChildren: () => import('./produto/produto.module').then( m => m.ProdutoPageModule),/* canActivate: [AuthGuard]*/
  },
  {
    path: 'carrinho',
    loadChildren: () => import('./carrinho/carrinho.module').then( m => m.CarrinhoPageModule), /*canActivate: [AuthGuard]*/
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then( m => m.CategoriasPageModule), /*canActivate: [AuthGuard]*/
  },
  {
    path: 'details',
    loadChildren: () => import('./pagesAdm/details/details.module').then( m => m.DetailsPageModule), /*canActivate: [AuthGuard]*/
  }, 
  {
    path: 'details/:id',
    loadChildren: () => import('./pagesAdm/details/details.module').then( m => m.DetailsPageModule), /*canActivate: [AuthGuard]*/
  },
  {
    path: 'listagem',
    loadChildren: () => import('./pagesAdm/listagem/listagem.module').then( m => m.ListagemPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'pesquisa',
    loadChildren: () => import('./pesquisa/pesquisa.module').then( m => m.PesquisaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
