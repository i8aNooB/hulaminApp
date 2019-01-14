import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController , AlertController , ToastController } from 'ionic-angular';

import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';


@IonicPage()
@Component({
  selector: 'page-form-result',
  templateUrl: 'form-result.html'
})
export class FormResultPage {
    messages: Observable<any[]>;
    messagesRef: AngularFireList<any>;
    authState: boolean = false;
    messagesArray : any=[]; 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams , 
    public loadingCtrl: LoadingController , 
    public  alertCtrl: AlertController , 
    private toastCtrl: ToastController, 
    public afDB: AngularFireDatabase, 
    public afAuth: AngularFireAuth) {

    // get authentication  from firebase 
    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        // User already logged in
        this.authState = true;
      } else {
        // Not logged in
        console.log('auth false');
        this.authState = false;
      }
    });

    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', 
      content: ''
    });
    loadingPopup.present();

    this.messagesRef = afDB.list('/message');
    // Use snapshotChanges().map() to store the key ( id )
    this.messages = this.messagesRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      ) 
     
    );
    setTimeout(() => {
      loadingPopup.dismiss();
    }, 1000);

  }


//######## CRUD #########//

 // Create //
  createMessage(){
    // check user permission
    if(this.authState){
      this.navCtrl.push('FormPage'); 
    }else{
      this.presentToast('bottom','No permission : Please login', 3000);  
      this.navCtrl.setRoot('MainPage');   
    }
  }

// Update //

  updateCategory(key: string, title, description ){

    // check user permission 
    if(this.authState){
      // User already logged in
      let prompt = this.alertCtrl.create({
        title: 'Message ',
        message: "Update message",
        enableBackdropDismiss: false,
        inputs: [
          {
            name: 'title',
            placeholder: 'Title message',
            value: title
          },
          {
            name: 'description',
            placeholder: 'Body message',
            value: description
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              this.messagesRef.update(key, {
                messageTitle: data.title,
                messageBody: data.description
              });
            }
          }
        ]
      });
      prompt.present();
      //this.messagesRef.remove(key); 
    }else{
      // permission denied
      this.presentToast('bottom','No permission : Please login', 3000);    
      this.navCtrl.setRoot('MainPage'); 
    }

  }


// Delete //
  deleteMessage(key: string) {  
    console.log("deleteMessage");
    // check user permission
    if(this.authState){
      this.presentToast('bottom','Removed', 1000);
      console.log("start to delete from messageId="+key)
      console.log("key="+key)
      this.messagesRef.remove(key); 
    }else{
      this.presentToast('bottom','No permission : Please login', 3000); 
      this.navCtrl.setRoot('MainPage');    
    }
  }

  presentToast(position: string,message: string ,duration: number) {
    let toast = this.toastCtrl.create({
      message: message,
      position: position,
      duration: duration
    });
    toast.present();
  }

}
