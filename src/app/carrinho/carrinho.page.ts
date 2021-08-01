import { Component } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { catchError } from 'rxjs/operators';
import { Carrinho } from '../models/carrinho';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { CarrinhoService } from '../services/carrinho.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage {

  public carrinho = new Array<Carrinho>();
  public carrinhoTemp = [];
  public userRegister: User = {};
  public UId: string;


  constructor(
    private productService: ProductService,
    private carrinhoService: CarrinhoService,
    private authService : AuthService,
    public fs: AngularFirestore
  
  ) {

  this.consulta();

  }

  async consulta(){

    this.UId = (await this.authService.getAuth().currentUser).uid;
    
    this.fs.collection('Pedido', ref => ref.where('UId', '==', this.UId )).snapshotChanges()
    .subscribe(data => {
      console.log(data);
      this.carrinhoTemp = [];
      data.forEach(childData => {
        let itemCarrinho = childData.payload.doc.data();
        itemCarrinho['id'] = childData.payload.doc.id;
        this.carrinhoTemp.push(itemCarrinho);
      });
      this.mostrarCarrinho();
    });
  }


  mostrarCarrinho() {
    this.carrinho = [];
    this.carrinhoTemp.forEach(async item => {
      this.buscarProduto(item.IdProduto, item.id);
    });
  }

  buscarProduto(id: string, idItemCarrinho: string) {
    this.productService.getProduct(id).subscribe(data => {
      data['idProduto'] = id;
      data['idItemCarrinho'] = idItemCarrinho;
      this.carrinho.push(data);
    });
  }

  async deleteCarrinho(id: string) {
    try {
      await this.carrinhoService.deleteCarrinho(id);
    } catch (error) {
      console.error(error);
      //this.presentToast('Erro ao tentar deletar');
    }
  }
}