import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController } from 'ionic-angular';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-form-modal',
  templateUrl: 'form-modal.html'
})
export class FormModalPage {
  contacts: Observable<any[]>;
  contactsRef: AngularFireList<any>;
  constructor(
    public navCtrl: NavController, 
    public afDB: AngularFireDatabase, 
    public viewCtrl: ViewController) {

      this.contactsRef = afDB.list('/profile');
      this.contacts = this.contactsRef.snapshotChanges().pipe(
        map(changes => 
          changes.map(c => ({ 
            key: c.payload.key, ...c.payload.val() 
          }))
        ) 
       
      );
  }

  selectContact(name,id,imgProfile) {
    console.log("selectContact id = "+id);
    let dataArray = {
      name: name,
      id: id,
      imgProfile: imgProfile
    };
    this.viewCtrl.dismiss(dataArray);
  }


}
