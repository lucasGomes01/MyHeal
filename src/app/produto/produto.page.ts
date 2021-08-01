import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { Carrinho } from '../models/carrinho';
import { CarrinhoService } from '../services/carrinho.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
  
})

export class ProdutoPage implements OnInit {
  private productId: string = null;
  public carrinho: Carrinho = {};
  public product: Product = {};
  private productSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private carrinhoService: CarrinhoService,
    private navCtrl: NavController,
    private authService: AuthService

  ) { 
    this.productId = this.activatedRoute.snapshot.params['id'];

    if (this.productId) this.loadProduct();
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }

  loadProduct(){
    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
    });
  }

  async addCarrinho() {
    //await this.presentLoading();,

    this.carrinho.UId =  (await this.authService.getAuth().currentUser).uid;
    this.carrinho.IdProduto = this.productId;
    //'e3P6V1n2bi4kCmBrrywe';
    //this.authService.getAuth().currentUser.uid;


      // this.product.createdAt = new Date().getTime();

    try {
      await this.carrinhoService.addCarrinho(this.carrinho);
      //await this.loading.dismiss();

      this.navCtrl.navigateBack('/carrinho');
    } catch (error) {
      //this.presentToast('Erro ao tentar salvar');
      //this.loading.dismiss();
    }
  }
}
