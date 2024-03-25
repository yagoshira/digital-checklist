import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiderScannerPageRoutingModule } from './lider-scanner-routing.module';

import { LiderScannerPage } from './lider-scanner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiderScannerPageRoutingModule
  ],
  declarations: [LiderScannerPage]
})
export class LiderScannerPageModule {}
