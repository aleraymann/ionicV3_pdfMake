webpackJsonp([9],{

/***/ 729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FinantialPageModule", function() { return FinantialPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__finantial__ = __webpack_require__(744);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FinantialPageModule = /** @class */ (function () {
    function FinantialPageModule() {
    }
    FinantialPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__finantial__["a" /* FinantialPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__finantial__["a" /* FinantialPage */]),
            ],
        })
    ], FinantialPageModule);
    return FinantialPageModule;
}());

//# sourceMappingURL=finantial.module.js.map

/***/ }),

/***/ 744:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FinantialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angularfire2_database__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the FinantialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FinantialPage = /** @class */ (function () {
    function FinantialPage(navCtrl, navParams, http, alertCtrl, db, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.db = db;
        this.toastCtrl = toastCtrl;
        this.totalReceive = 0;
        this.received = 0;
        this.toReceive = 0;
        this.Patients = [];
    }
    FinantialPage.prototype.ionViewDidLoad = function () {
        this.getPatients();
    };
    //------------------------------------------NAVIGATE
    FinantialPage.prototype.goPatient = function () {
        this.navCtrl.push('PatientPage');
    };
    FinantialPage.prototype.goHome = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
    };
    //------------------------------------------GET_PATIENTS
    FinantialPage.prototype.getPatients = function () {
        var _this = this;
        this.http.get('https://agendapp-6daf1.firebaseio.com/patients.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data !== null && data !== undefined) {
                _this.ShowPatients(data);
            }
        });
    };
    //--------------------------------------------------SHOW_PATIENTS
    FinantialPage.prototype.ShowPatients = function (data) {
        var _this = this;
        this.Patients = Object.keys(data).map(function (i) {
            data[i]._i = i;
            _this.totalReceive = _this.totalReceive += parseFloat(data[i].value_payment);
            if (data[i].payment != false) {
                _this.received = _this.received += parseFloat(data[i].value_payment);
            }
            else {
                _this.toReceive = _this.totalReceive - _this.received;
            }
            return data[i];
        });
    };
    FinantialPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-finantial',template:/*ion-inline-start:"/home/aleraymann/Documentos/ionic-workspace/AngendApp_pdf2/src/pages/finantial/finantial.html"*/'<!--\n  Generated template for the FinantialPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Financeiro</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>Total a Receber: R$ {{totalReceive}}</h3>\n  <hr>\n  <h3>Recebido</h3>\n  <hr>\n  <ion-list>\n    <div *ngFor="let p of Patients">\n      <ion-item *ngIf="p.payment !=false">\n        <ion-label>{{ p.name }}</ion-label>\n        <ion-label>R$:{{p.value_payment}}</ion-label>\n      </ion-item>\n    </div>\n  </ion-list>\n  <ion-item>\n    <ion-label color="secondary">Total Recebido: R$ {{this.received}}</ion-label>\n  </ion-item>\n\n  <hr>\n\n  <h3>Em Aberto</h3>\n  <hr>\n  <ion-list>\n    <div *ngFor="let p of Patients">\n      <ion-item *ngIf="p.payment !=true">\n        <ion-label>{{ p.name }}</ion-label>\n        <ion-label>R$:{{p.value_payment}}</ion-label>\n      </ion-item>\n     \n    </div>\n  </ion-list>\n      <ion-item>\n        <ion-label color="danger">Total em aberto: R$ {{this.toReceive}}</ion-label>\n      </ion-item>\n      <hr><br>\n  \n     \n\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <div>\n          <button ion-button block outline (click)="goHome()">\n            Início\n          </button>\n        </div>\n      </ion-col>\n      <ion-col>\n        <div>\n          <button ion-button block outline (click)="goPatient()">\n            Pacientes\n          </button>\n        </div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"/home/aleraymann/Documentos/ionic-workspace/AngendApp_pdf2/src/pages/finantial/finantial.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["AngularFireDatabase"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
    ], FinantialPage);
    return FinantialPage;
}());

//# sourceMappingURL=finantial.js.map

/***/ })

});
//# sourceMappingURL=9.js.map