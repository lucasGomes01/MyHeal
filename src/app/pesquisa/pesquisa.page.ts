import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from './../models/product';
import {AngularFirestore} from '@angular/fire/firestore'
import { Carrinho } from '../models/carrinho';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.page.html',
  styleUrls: ['./pesquisa.page.scss'],
})
export class PesquisaPage implements OnInit {

  public products = new Array<Product>();
  private productsSubscription: Subscription;

  public folder: string;
  public listaProdutos = new Array<Product>();

  sampleArr=[];
  resultArr=[];

  constructor(
    public fs: AngularFirestore,

    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { 
    this.getAllProducts();
  }

  getAllProducts(){
    this.productsSubscription = this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
  
  
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  search(event) {
    let searchKey:string = event.target.value;
    if(searchKey.length == 0){
      this.getAllProducts();
    }
    let firstLetter = searchKey.toUpperCase();

     console.log(10);
    if(searchKey.length == 0){
      this.products = [];
      this.resultArr = [];
    }
    if(this.products.length == 0){
      this.fs.collection('Products',ref=>ref.where('name','==',firstLetter)).snapshotChanges()
      .subscribe(data=>{
        data.forEach(childData => {
          this.products.push(childData.payload.doc.data())
          
        })
      })
    }
    else{
      this.resultArr = [];
      this.products.forEach(val => {
        let name: String = val['name'];

        if(name.toUpperCase().startsWith(searchKey.toUpperCase())){
          if(true){
            this.resultArr.push(val);
            console.log(val);
            console.log(name);
          }
        }
      }
      )
    }
    
    console.log(this.resultArr.push);
  }

}