import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController , LoadingController} from 'ionic-angular';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})

export class FeedPage {

  feeds: AngularFireList<any>;
  feedsRef: AngularFireList<any>;

  feed: Observable<any[]>;
  feedList:  Observable<any[]>;
  feedListArray:any[];

  feedView: string = "activity";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams ,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController, 
    public afDB: AngularFireDatabase) {
 
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });

    loadingPopup.present();
    this.feedsRef =  afDB.list('/feed');
    this.feedList = this.feedsRef.snapshotChanges().pipe(
        map(changes => 
          changes.map(c => ({ 
            key: c.payload.key, ...c.payload.val()
          })
        )
      )
    );
    loadingPopup.dismiss()
  }

  // Opens a description page when tapping on an item on the feed.
  goToDetail(itemId){
    this.navCtrl.push('Detail1Page',{itemId:itemId}); 
  }
}
