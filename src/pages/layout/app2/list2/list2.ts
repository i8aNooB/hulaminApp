import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-list2',
  templateUrl: 'list2.html'
})
export class List2Page {

  categoryId:any
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public afDB: AngularFireDatabase) {
      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent',
        content: ''
      });
      loadingPopup.present();

    //this.categoryId = parseFloat(this.navParams.get('categoryId').toString());  
    this.categoryId =  parseInt(this.navParams.get('categoryId'));
    this.itemsRef = afDB.list('/list', ref => ref.orderByChild('categoryId').equalTo(this.categoryId));
    // Use snapshotChanges().map() to store the key ( id )
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(data => ({ 
          key: data.payload.key, ...data.payload.val() 
        }))
        
      ) 
    );
    setTimeout(() => {
      loadingPopup.dismiss();
    }, 1000);



}

  goToDetail(itemId){
      this.navCtrl.push('Detail2Page',{itemId:itemId}); 
  }


}
