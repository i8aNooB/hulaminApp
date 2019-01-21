import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


//*********** Import image gallery **************//
import { GalleryModal } from 'ionic-gallery-modal';


@IonicPage()
@Component({
  selector: 'page-detail1',
  templateUrl: 'detail1.html'
})
export class Detail1Page {

  //*********** Variables for fading header **************//
  showToolbar:boolean = false;
  transition:boolean = false;
  headerImgSize:string = '100%';
  headerImgUrl:string = '';
  //****************************//

  itemId: any;
  item: Observable<any>;

  itemImages: Observable<any[]>;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController, 
    public afDB: AngularFireDatabase , 
    private toastCtrl: ToastController ,
    public ref: ChangeDetectorRef) {

    this.itemId = this.navParams.get('itemId');
    this.item =  afDB.object('/feed/'+this.itemId).valueChanges();
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
}
