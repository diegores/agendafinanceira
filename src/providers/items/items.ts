import { Injectable } from '@angular/core';


import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';

@Injectable()
export class Items {

  constructor(public afd: AngularFireDatabase, public toastCtrl: ToastController) { 
    
  }

  query(params?: any) {
    if (!params) {
      return this.afd.list('items/');

    }
    //return this.afd.list('items/');
    //return this.api.get('/items', params);
  }

  add(item: any) {
    //TODO: Pegar o último id e incrementar para passar a variável
    let seq = this.afd.list("items/").push(item);
      seq.then(() => {
        this.presentToast("Cadastrado com Sucesso!");
      }, (err) => {
        alert('Erro ao inserir item');
      });

  return seq;
  }

  delete(item: any) {
     let seq = this.afd.list("items/").remove(item.key);
     seq.then(() => {
      this.presentToast("Item excluído com Sucesso!");
    }, (err) => {
      alert('Erro ao excluir um item');
    });
    }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  update(item: any){
    let seq = this.afd.database.ref("items/").update(item);
    seq.then(() => {
      this.presentToast("Item alterado com Sucesso!");
    }, (err) => {
      alert('Erro ao alterar item');
    });

return seq;
  }

}
