import { Component, AnimationKeyframesSequenceMetadata } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController , ToastController } from 'ionic-angular';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-category1',
  templateUrl: 'category1.html'
})
export class Category1Page {
 
  viewType: string = "list";
  query: any[] = [];

  category: Observable<any[]>;
  categoryRef: AngularFireList<any>;
 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController, 
    public afDB: AngularFireDatabase ,
    private toastCtrl: ToastController ) {

    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();


    this.categoryRef = afDB.list('/category', ref => ref.orderByChild('type').equalTo('place'));
    
    // Use snapshotChanges().map() to store the key ( id )
    this.category = this.categoryRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      ) 
     
    );
    setTimeout(() => {
      loadingPopup.dismiss();
    }, 1000);

  }


  //*********** Open list page  **************/
  openList(categoryId){
      console.log("open categoryId="+ categoryId);
      this.navCtrl.push('List1Page',{categoryId:categoryId}); 
  }


}
