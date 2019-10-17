import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdfMakePage } from './pdf-make';

@NgModule({
  declarations: [
    PdfMakePage,
  ],
  imports: [
    IonicPageModule.forChild(PdfMakePage),
  ],
})
export class PdfMakePageModule {}
