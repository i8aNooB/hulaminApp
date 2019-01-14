import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage,NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';


import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


@IonicPage()
@Component({
  selector: 'page-list1',
  templateUrl: 'list1.html'
})
export class List1Page {
  @ViewChild('map') map3Element: ElementRef;
  categoryId:any

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController , 
    public afDB: AngularFireDatabase) {

    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();
    this.categoryId = this.navParams.get('categoryId');
    this.itemsRef = afDB.list('/list', ref => ref.orderByChild('categoryId').equalTo(parseInt(this.categoryId) ));

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
      this.navCtrl.push('Detail1Page',{itemId:itemId}); 
  }


 showMap() {
    let mapModal = this.modalCtrl.create('ListMap1Page', { 
    categoryId:this.categoryId
    });
    //let profileModal = this.modalCtrl.create(MapDetailPage, {lat: deviceNum,lng:lng});
    mapModal.present();
 }

}
