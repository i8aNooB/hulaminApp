import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, LoadingController,ToastController} from 'ionic-angular';

import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


//*********** Import image gallery **************//
import { GalleryModal } from 'ionic-gallery-modal';




@IonicPage()
@Component({
  selector: 'page-profile4',
  templateUrl: 'profile4.html'
})
export class Profile4Page {
    loaded: boolean ;
    profile:  Observable<any>;
    friends:  Observable<any[]>;

    imgGallery: Observable<any[]>;
    imgGalleryArray : any=[]; 

    photos: any[] = [];
    getIndex:number;

    segmentView: string = "one";
    following: boolean = false;
    
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController, 
    private toastCtrl: ToastController, 
    public afDB: AngularFireDatabase) {
      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent', 
        content: ''
      });
      loadingPopup.present();

      this.profile = afDB.object('/profile/1').valueChanges();
      this.friends = afDB.list('/profile/1/friends').valueChanges();

      this.imgGallery = afDB.list('/gallery').valueChanges();
      this.imgGallery.subscribe(imgGallery => {
          this.imgGalleryArray = imgGallery;
          loadingPopup.dismiss()
      })


  }

  follow() {
    this.following = !this.following;
    this.presentToast('bottom','Follow user clicked');
  }

  fullscreenImage(getIndex) {
    //console.log("NEW ==== getIndex="+getIndex);
    let modal = this.modalCtrl.create(GalleryModal,  {
        // For multiple images //
        photos:   this.imgGalleryArray ,
        // For single image //
        // photos: [{url:getImage}], 
      closeIcon: 'close-circle',
      initialSlide: getIndex 
      });
      // console.log("getIndex="+getIndex);
    modal.present();
  }


  presentToast(position: string,message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      position: position,
      duration: 1000
    });
    toast.present();
  }

}
