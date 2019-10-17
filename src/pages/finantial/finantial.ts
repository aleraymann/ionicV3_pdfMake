import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';


/**
 * Generated class for the FinantialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-finantial',
  templateUrl: 'finantial.html',
})
export class FinantialPage {
  Patients;
  totalReceive = 0;
  received = 0;
  toReceive = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController,
    public db: AngularFireDatabase,
    public toastCtrl: ToastController,

  ) {
    this.Patients = [];

  }

  ionViewDidLoad() {
    this.getPatients();
  }
  //------------------------------------------NAVIGATE
  goPatient() {
    this.navCtrl.push('PatientPage');
  }
  goHome() {
    this.navCtrl.push(HomePage);
  }
  //------------------------------------------GET_PATIENTS
  getPatients() {
    this.http.get('https://agendapp-6daf1.firebaseio.com/patients.json')
      .map(res => res.json())
      .subscribe(data => {
        if (data !== null && data !== undefined) {
          this.ShowPatients(data);
        }
      })
  }
  //--------------------------------------------------SHOW_PATIENTS
  ShowPatients(data) {
    this.Patients = Object.keys(data).map(i => {
      data[i]._i = i;
      this.totalReceive = this.totalReceive += parseFloat(data[i].value_payment);
      if (data[i].payment != false) {
        this.received = this.received += parseFloat(data[i].value_payment);
      } else {
        this.toReceive = this.totalReceive - this.received;
      }
      return data[i];
    });
  }

}