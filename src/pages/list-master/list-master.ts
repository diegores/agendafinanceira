import { User } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/items/items';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  listItens : Observable<any[]>;

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, public user: User, 
    public toastCtrl: ToastController) {
    var listMaster : AngularFireList<any> = this.items.query();
    this.listItens  =  listMaster.snapshotChanges();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: any) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

   doLogout() {
    try {
      const result = this.user.logoutUser();
      if (result) {
        this.navCtrl.setRoot('LoginPage');
      }
    }
    catch (e) {
      let toast = this.toastCtrl.create({
        message: e.message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

}
