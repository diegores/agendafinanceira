import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ItemDetailPage } from './item-detail';
import { AppMaskerModule } from 'brmasker-ionic';

@NgModule({
  declarations: [
    ItemDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetailPage),
    TranslateModule.forChild(),
    AppMaskerModule
  ],
  exports: [
    ItemDetailPage
  ]
})
export class ItemDetailPageModule { }
