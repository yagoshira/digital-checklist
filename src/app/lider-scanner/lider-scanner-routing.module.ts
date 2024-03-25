import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiderScannerPage } from './lider-scanner.page';

const routes: Routes = [
  {
    path: '',
    component: LiderScannerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiderScannerPageRoutingModule {}
