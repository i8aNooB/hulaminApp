import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//*********** ionic Native **************/
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';

//************ Custom Pages *************/
import { ProductsPage } from '../pages/products/products';
import { LoginPage } from '../pages/layout/auth/login/login';

//***********  Angularfire2 v5 **************/

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';


// New imports to update based on AngularFire2 version 4
//import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
// New imports to update based on AngularFire2 V5

//import { AngularFireAuthModule } from 'angularfire2/auth';

//***********  Facebook **************/
import { Facebook } from '@ionic-native/facebook';
//***********  Google plus **************/
import { GooglePlus } from '@ionic-native/google-plus';

//*********** Provider **************/
import { AuthData } from '../providers/auth-data';
import { RadioPlayer } from '../providers/radio-service';


//************** import image gallery *********************//

import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';


//********** firebase configuration  ************ */
export const config = { 
  apiKey: "AIzaSyB5Qgii2Zci0m98HjhU-9a10nwna2W9UVk",
  authDomain: "hulamin-app.firebaseapp.com",
  databaseURL: "https://hulamin-app.firebaseio.com",
  projectId: "hulamin-app",
  storageBucket: "hulamin-app.appspot.com",
  messagingSenderId: "1000985226279"
};
  
@NgModule({
  declarations: [
    MyApp,
    ProductsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    ionicGalleryModal.GalleryModalModule,
    IonicModule.forRoot(MyApp),
  
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProductsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,

    AngularFireDatabase,
    Geolocation,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    Facebook,
    RadioPlayer,
    Facebook,
    GooglePlus
  ]
})
export class AppModule {}
