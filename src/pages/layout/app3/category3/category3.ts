import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-category3',
  templateUrl: 'category3.html'
})

export class Category3Page {

  viewType: string = "Menu";

  categoryRef: AngularFireList<any>;
  category: Observable<any[]>;

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public loadingCtrl: LoadingController , 
      public afDB: AngularFireDatabase) {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', 
      content: ''
    });
    loadingPopup.present();

    this.categoryRef = afDB.list('/category', ref => ref.orderByChild('type').equalTo('restaurant'));
    // Use snapshotChanges().map() to store the key ( id )
    this.category = this.categoryRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(data => ({ key: data.payload.key, ...data.payload.val() }))
      ) 
    );

    this.itemsRef = afDB.list('/list', ref => ref.orderByChild('promotion').equalTo(true));
    // Use snapshotChanges().map() to store the key ( id )
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(data => ({ key: data.payload.key, ...data.payload.val() }))
      ) 
    );


    setTimeout(() => {
      loadingPopup.dismiss();
    }, 1000);

  }

  openList(categoryId){
    this.navCtrl.push('List3Page',{categoryId:categoryId}); 
  }

  goToDetail(itemId){
    this.navCtrl.push('Detail3Page',{itemId:itemId}); 
  }

}
