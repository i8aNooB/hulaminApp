import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

//***********  ionic-native **************/
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/layout/auth/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  menu:Array<any> = [];
  pages: Array<any>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.menu = [          
        {
          title: '',
          myicon:'',
          iconLeft: 'home',
          icon: '',
          showDetails: false,
          items:  [
              {name:'Home',component:'FeedPage'},// Home Page
          ]
        },
        {
          title: '',
          myicon:'',
          iconLeft: 'contact',
          icon: '',
          showDetails: false,
          items:  [
              {name:'My Profile',component:'AfterLoginPage'},
          ]
        }, {
          title: '',
          myicon:'',
          iconLeft: 'list-box',
          icon: '',
          showDetails: false,
          items:  [
              {name:'Products Catalog',component:'Category2Page'},// app2 folder
          ]
        }
    ];

    this.pages = [ 
      // { icon:'call', title:'Contact us', component: 'ContactPage' },
      { icon:'exit', title:'Logout', component: "MainPage" }    
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      this.statusBar.styleDefault();
      this.statusBar.hide();
      this.statusBar.overlaysWebView(true);
      this.splashScreen.hide();
    });
  }
  toggleDetails(menu) {
    if (menu.showDetails) {
        menu.showDetails = false;
        menu.icon = 'ios-add-outline';
    } else {
        menu.showDetails = true;
        menu.icon = 'ios-remove-outline';
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // page.component = item array.component --> 
    //this.nav.setRoot(page.component);
    this.nav.setRoot(page.component);
  }

}
