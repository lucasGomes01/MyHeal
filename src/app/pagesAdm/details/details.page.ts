import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Observable, Subscription } from 'rxjs';
import { NavController, Platform } from '@ionic/angular';
import { finalize} from 'rxjs/operators'

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public product: Product = {};
  public uploadPercent: Observable<number>;
  public downloadUrl: Observable<string>;
  private productId: string = null;
  private productSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private navCtrl: NavController,
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private afStorage: AngularFireStorage
   
    
  ) { 

  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }

  ionViewWillEnter(){
    this.productId = this.activatedRoute.snapshot.params['id'];

    if (this.productId) this.loadProduct();
  }

  loadProduct(){
    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
    });
  }

  async saveProduct() {
    //await this.presentLoading();,

    this.product.userId = (await this.authService.getAuth().currentUser).uid;

    //'e3P6V1n2bi4kCmBrrywe';
    //this.authService.getAuth().currentUser.uid;

    if (this.productId) {
      try {
        await this.productService.updateProduct(this.productId, this.product);
        //await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        //this.presentToast('Erro ao tentar salvar');
        //this.loading.dismiss();
      }
    } else {
      this.product.createdAt = new Date().getTime();

      try {
        await this.productService.addProduct(this.product);
        //await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        //this.presentToast('Erro ao tentar salvar');
        //this.loading.dismiss();
      }
    }
  }

  async openGalery(id : string){
    console.log(id);
    const options: CameraOptions = { 
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    };


    try{

      const fileUri: string = await this.camera.getPicture(options);

      let file: string;

      if (this.platform.is('ios')) { 
      file = fileUri.split('/').pop();
      } else {
      file = fileUri.substring(fileUri.lastIndexOf('/') + 1, fileUri.indexOf ('?'));
      }

      const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));

      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
      const blob: Blob = new Blob([buffer], {type: 'image/jpeg'});

      this.uploadPicture(blob);
    } catch (error) { 
      console.error(error);
    }
  }

  uploadPicture(blob: Blob){
    const ref = this.afStorage.ref('productImg/' + this.productId + 'jpg');
    const task = ref.put(blob);

    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => this.downloadUrl = ref.getDownloadURL())
    ).subscribe();
    this.saveUrl();
  }

saveUrl(){

  console.log(this.downloadUrl)
  this.product.picture1 = this.downloadUrl.toString();
}

}
