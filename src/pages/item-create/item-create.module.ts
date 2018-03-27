import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ItemCreatePage } from './item-create';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    ItemCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ItemCreatePage),
    TranslateModule.forChild(),
    BrMaskerModule
  ],
  exports: [
    ItemCreatePage
  ]
})
export class ItemCreatePageModule { }
