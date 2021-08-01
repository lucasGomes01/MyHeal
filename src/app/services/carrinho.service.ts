import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Carrinho } from '../models/carrinho';
import { map } from  'rxjs/operators';  

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private carrinhoCollection: AngularFirestoreCollection<Carrinho>;

  constructor(private afs: AngularFirestore) { 
    this.carrinhoCollection = this.afs.collection<Carrinho>('Pedido');
  }

  addCarrinho(carrinho: Carrinho){
    return this.carrinhoCollection.add(carrinho);
  }

  getCarrinho(id: string){
    return this.carrinhoCollection.doc<Carrinho>(id).valueChanges();
  }

  updateCarrinho(id: string, carrinho: Carrinho){
    return this.carrinhoCollection.doc<Carrinho>(id).update(carrinho);
  }

  deleteCarrinho(id: string){
    return this.carrinhoCollection.doc<Carrinho>(id).delete();
  }
}
