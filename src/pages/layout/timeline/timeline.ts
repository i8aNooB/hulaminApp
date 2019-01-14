import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController , LoadingController} from 'ionic-angular';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class TimelinePage {

  timelineRef: AngularFireList<any>;
  timeline: Observable<any[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController ,
    public modalCtrl: ModalController, 
    public afDB: AngularFireDatabase) {
      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent',
        content: ''
      });
      loadingPopup.present();
    
      this.timelineRef =  afDB.list('/timeline');
      this.timeline = this.timelineRef.snapshotChanges().pipe(
          map(changes => 
            changes.map(c => ({ 
              key: c.payload.key, ...c.payload.val()
            })
          )
        )
      );
      loadingPopup.dismiss();

  }



}
