import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-detail2',
  templateUrl: 'detail2.html'
})
export class Detail2Page {


  //*********** Variables for fading header **************//
  showToolbar:boolean = false;
  transition:boolean = false;
  // headerImgSize:string = '100%';
  // headerImgUrl:string = '';
  //****************************//

  itemId: any;
  item: Observable<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public afDB: AngularFireDatabase ,
    private toastCtrl: ToastController) {
      this.itemId = this.navParams.get('itemId');
      console.log("++++++itemId="+this.navParams.get('itemId'));

      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent',
        content: ''
      });
      loadingPopup.present();
  
      this.itemId = this.navParams.get('itemId');
      this.item =  afDB.object('/list/'+this.itemId).valueChanges();
      loadingPopup.dismiss();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Detail1Page');
  }
   //*********** Add to cart**************/
  addToCart(position: string) {
    const toast = this.toastCtrl.create({
        message: 'Item was added',
        position: position,
        duration: 3000
    });
    toast.onDidDismiss(this.dismissHandler);
    toast.present();
  }
  private dismissHandler() {
    console.info('Toast onDidDismiss()');
  }

}
