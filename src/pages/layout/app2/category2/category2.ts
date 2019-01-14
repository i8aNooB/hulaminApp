import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';



@IonicPage()
@Component({
  selector: 'page-category2',
  templateUrl: 'category2.html'
})
export class Category2Page {
 
  category: Observable<any[]>;
  categoryRef: AngularFireList<any>;
 
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

      this.categoryRef = afDB.list('/category', ref => ref.orderByChild('type').equalTo('ecom'));
      // Use snapshotChanges().map() to store the key ( id )
      this.category = this.categoryRef.snapshotChanges().pipe(
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

  openList(categoryId){
      this.navCtrl.push('List2Page',{categoryId:categoryId}); 
  }

}
