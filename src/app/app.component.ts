import { ClassRegisterPage } from './../pages/class-register/class-register';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PatientRegisterPage } from '../pages/patient-register/patient-register';
import { ReminderPage } from '../pages/reminder/reminder';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


  rootPage: any = LoginPage;


  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  goPatientRegisterPage() {
    this.nav.push(PatientRegisterPage);
  }
  goReminderPage() {
    this.nav.push(ReminderPage);
  }
  goFinantialPage() {
    this.nav.push('FinantialPage');
  }
  goClassRegisterPage() {
    this.nav.push(ClassRegisterPage);
  }
  logout() {
    this.nav.setRoot(LoginPage);
  }
  restartFinantial() {
    const confirm = this.alertCtrl.create({
      title: 'Aviso',
      message: 'Zerar o Financeiro, somente após gerar o relarório financeiro atual!',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim!',
          handler: () => {
            console.log('Agree clicked');
            this.nav.push('PdfMakePage');
          }
        }
      ]
    });
    confirm.present();
  }
}
