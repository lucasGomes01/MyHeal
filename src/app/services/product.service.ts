import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from  'rxjs/operators';  
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product>;

  constructor(private afs: AngularFirestore) { 
    this.productsCollection = this.afs.collection<Product>('Products');
  }

  getProducts(){
    return this.productsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return  {id, ...data};
        });
      })
    )
  }

  addProduct(product: Product){
    return this.productsCollection.add(product);
  }

  getProduct(id: string){
    return this.productsCollection.doc<Product>(id).valueChanges();
    //: Promise<Product>
    // const product = await this.productsCollection.doc(id).ref.get();
    // if(product){
    //   const productData = product.data();
    //   return {
    //     id: productData.id,
    //     name: productData.name,
    //     description: productData.description,
    //     picture1: productData.picture1,
    //     picture2: productData.picture2,
    //     picture3: productData.picture3,
    //     picture4: productData.picture4,
    //     price: productData.price,
    //     createdAt: productData.createdAt,
    //     userId: productData.userId
    //   };
    // }
  }

  updateProduct(id: string, product: Product){
    return this.productsCollection.doc<Product>(id).update(product);
  }

  deleteProduct(id: string){
    return this.productsCollection.doc<Product>(id).delete();
  }
}
