import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, LoadingController } from 'ionic-angular';

import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';



@IonicPage()
@Component({
  selector: 'page-radio-list',
  templateUrl: 'radio-list.html'
})
export class RadioListPage {

  radio: Observable<any[]>;
  radioRef: AngularFireList<any>;

  constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController , 
    public afDB: AngularFireDatabase) {

    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', 
      content: ''
    });
    loadingPopup.present();


    this.radioRef = afDB.list('/radio');
    
    // Use snapshotChanges().map() to store the key ( id )
    this.radio = this.radioRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      ) 
     
    );
    setTimeout(() => {
      loadingPopup.dismiss();
    }, 1000);
  }

  openPlayer(radioId) {
    let profileModal = this.modalCtrl.create('RadioPage', { 
      radioId: radioId
    });
    profileModal.present();
  }
}
