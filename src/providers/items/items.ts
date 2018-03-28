import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';

@Injectable()
export class Items {

  constructor(public api: Api, public afd: AngularFireDatabase, public toastCtrl: ToastController) { 
    
  }

  query(params?: any) {
    return this.api.get('/items', params);
  }

  add(item: any) {
    //TODO: Pegar o último id e incrementar para passar a variável
    var id: number = 1;
    let seq = this.afd.database.ref("items/"+ "item "+id).set(item);
      seq.then(() => {
        this.presentToast("Cadastrado com Sucesso!");
      }, (err) => {
        alert('Erro ao inserir item');
      });

  return seq;
  }

  delete(item: Item) {
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
