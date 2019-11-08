import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ToastController} from 'ionic-angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import firebase from 'firebase';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';


/**
 * Generated class for the PdfMakePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pdf-make',
  templateUrl: 'pdf-make.html',
})
export class PdfMakePage {

  letterObj = {
    month: '',
    from: '',
    text: ''
  }

  pdfObj = null;

  usuario: any;
  Patients;
  patient;

  totalReceive = 0;
  received = 0;
  toReceive = 0;

  dataName;
  dataPay;
  dataValue;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private plt: Platform,
    private file: File,
    private fileOpener: FileOpener,
    public http: Http,
    public alertCtrl: AlertController,
    public db: AngularFireDatabase,
    public toastCtrl: ToastController,
  ) {

    this.usuario = firebase.auth().currentUser;
    this.Patients = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PdfMakePage');
    this.getPatients();
  }
  getPatients() {
    this.http.get('https://agendapp-6daf1.firebaseio.com/patients.json')
      .map(res => res.json())
      .subscribe(data => {
        if (data !== null && data !== undefined) {
          this.ShowPatients(data);
          this.patient = data;
        }
      })
  }
  //--------------------------------------------------SHOW_PATIENTS
  ShowPatients(data) {
    this.Patients = Object.keys(data).map(i => {
      data[i]._i = i;
      //console.log(data[i].name, "-", data[i].payment);
      this.dataName = data[i].name;
      this.dataValue = data[i].value_payment;
      this.dataPay = data[i].payment;
      this.totalReceive = this.totalReceive += parseFloat(data[i].value_payment);
      if (data[i].payment != false) {
        this.received = this.received += parseFloat(data[i].value_payment);
      } else {
        this.toReceive = this.totalReceive - this.received;
      }
      return data[i];

    });
    this.Patients.sort((a, b) => (a.name < b.name) ? -1 : 1);
  }
  //--------------------------------------------------PDF_GENERATE
  createPdf() {
    var docDefinition = {
      content: [
        { text: 'Relatório Financeiro de ' + this.letterObj.month, style: 'header' },
        { text: new Date().toLocaleDateString(), alignment: 'right' },

        { text: 'De:', style: 'subheader' },
        { text: 'AgendApp' },
        this.usuario.email,
        { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },

        [
          'Total Recebido: ' + this.received,
          '--------------------------------',
          'Total em Aberto: ' + this.toReceive,
          '--------------------------------',
          'Total a Receber: ' + this.totalReceive,
          '---------------------------------',

          //this.Patients.forEach (data [this.dataName, Patients);  
          /*this.patient.forEach(element => {
            console.log(element.name, element.payment)
            return element.name;
          })*/
          
        'Pacientes: ',
          this.dataName + ": " + this.dataValue + " - " + (this.dataPay != false ? 'Pago' : 'Em Aberto'),

         
          

        ]

      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    //--------------------------------------------------PDF_DOWNLOAD
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'AgendApp.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'AgendApp.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }
  //--------------------------------------------------RESTART_FINANTIAL
  restartFinancial(payment) {
    const confirm = this.alertCtrl.create({
      title: 'Zerar Financeiro?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelar Clicado');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {

            this.http.get('https://agendapp-6daf1.firebaseio.com/patients.json')
              .map(res => res.json())
              .subscribe(data => {
                this.Patients = Object.keys(data).map(i => {
                  data[i]._i = i;
                  if (data !== null && data !== undefined) {
                    this.db.database.ref('patients/' + i).update({
                      payment: false
                    })
                  }
                })
              })
            this.navCtrl.setRoot(HomePage);
            const toast = this.toastCtrl.create({
              message: 'Financeiro Zerado',
              duration: 3000
            });
            toast.present();
          }
        }
      ]
    });
    confirm.present();
  }


}
