import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController  } from 'ionic-angular';

import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


@IonicPage()
@Component({
  selector: 'page-masonry',
  templateUrl: 'masonry.html'
})
export class MasonryPage {
  loaded: boolean ;
  masonry: Observable<any[]>;
  masonryArray: any=[]; 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController, 
    public modalCtrl: ModalController, 
    public afDB: AngularFireDatabase ) {
        let loadingPopup = this.loadingCtrl.create({
          spinner: 'crescent', 
          content: ''
        });
        loadingPopup.present();

        this.masonry = afDB.list('/masonry').valueChanges();
        this.masonry.subscribe(() => loadingPopup.dismiss());
  }



}
