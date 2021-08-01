
import { ProductService } from 'src/app/services/product.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.page.html',
  styleUrls: ['./listagem.page.scss'],
})
export class ListagemPage {
  public products = new Array<Product>();
  private productsSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private AuthService: AuthService
    ) {
    this.productsSubscription = this.productService.getProducts().subscribe(data => {
    this.products = data; 
    });
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

  async logout(){
    try{
      await this.AuthService.logout();
      console.log('saiu');
    } catch (error) {
      console.error(error);
    }

  }

  async deleteProduct(id: string) {
    try {
      await this.productService.deleteProduct(id);
    } catch (error) {
      console.error(error);
      //this.presentToast('Erro ao tentar deletar');
    }
  }
}
