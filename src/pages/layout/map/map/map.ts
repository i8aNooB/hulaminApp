import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController , LoadingController} from 'ionic-angular';

import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

export class MapPage {
  mapList: Observable<any[]>;
  mapRef: AngularFireList<any>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController, 
    public afDB: AngularFireDatabase) {
      let loading = this.loadingCtrl.create({
        spinner: 'crescent',
        content: ''
      });
      loading.present();
      this.mapList = afDB.list('/map').valueChanges();
      this.mapList.subscribe(() => loading.dismiss());


    // Use snapshotChanges().map() to store the key ( id )
    this.mapRef = afDB.list('/map');
    this.mapList = this.mapRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ 
          key: c.payload.key, ...c.payload.val() 
        }))
      ) 
    );
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
         
  }


  showDetail(mapId) {
    let profileModal = this.modalCtrl.create('MapDetailPage', { 
        mapId: mapId
    });
    profileModal.present();
  }
  showMapMarker() {
    let profileModal2 = this.modalCtrl.create('MapMarkerPage');
    profileModal2.present();
  }

}
