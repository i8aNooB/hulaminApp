import { Component, ChangeDetectorRef  } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController , LoadingController } from 'ionic-angular';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-detail3',
  templateUrl: 'detail3.html'
})
export class Detail3Page {

  itemId: any;

  item: Observable<any>;
  itemOption: Observable<any>;
  itemSize: Observable<any>;

  itemOptionArray: any=[]; 
  itemSizeArray: any=[]; 

  //*********** Variables for fading header **************//
  showToolbar:boolean = false;
  transition:boolean = false;
  headerImgSize:string = '100%';
  headerImgUrl:string = '';
  //****************************//

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public afDB: AngularFireDatabase,public ref: ChangeDetectorRef,private toastCtrl: ToastController) {
     
      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent', 
        content: ''
      });
      loadingPopup.present();     
      this.itemId = this.navParams.get('itemId');
// item //
      this.item =  afDB.object('/list/'+this.itemId).valueChanges();
//item option //
      this.itemOption = afDB.list('/list/'+this.itemId+'/options' ).valueChanges();
      this.itemOption.subscribe( (value) => {
        this.itemOptionArray = value; 
        console.log(this.itemOptionArray);
      });
//item size //
      this.itemSize = afDB.list('/list/'+this.itemId+'/size' ).valueChanges();
      this.itemSize.subscribe( (value) => {
        this.itemSizeArray = value; 
        console.log(this.itemSizeArray);
      });
      setTimeout(() => {
        loadingPopup.dismiss();
      }, 1000);

  }
 //*********** Fading header  **************/
  onScroll($event: any){
        let scrollTop = $event.scrollTop;
        this.showToolbar = scrollTop >= 100;
        if(scrollTop < 0){
            this.transition = false;
            this.headerImgSize = `${ Math.abs(scrollTop)/2 + 100}%`;
        }else{
            this.transition = true;
            this.headerImgSize = '100%'
        }
        this.ref.detectChanges();
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad Detail1Page');


  }

}
