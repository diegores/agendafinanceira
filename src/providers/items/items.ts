import { Item } from './../../models/item';
import { Injectable } from '@angular/core';


import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController, LoadingController } from 'ionic-angular';

@Injectable()
export class Items {

  constructor(public afd: AngularFireDatabase, public toastCtrl: ToastController, public loadingCtrl: LoadingController) { 
    
  }

  query(params?: any) {
    this.presentLoadingDefault();
    if (!params) {
      return this.afd.list('items/');

    }
    
  }

  add(item: any) {
    //TODO: Pegar o último id e incrementar para passar a variável
    this.presentLoadingDefault();
    let seq = this.afd.list("items/").push(item);
      seq.then(() => {
        this.presentToast("Cadastrado com Sucesso!");
      }, (err) => {
        alert('Erro ao inserir item');
      });

  return seq;
  }

  delete(item: any) {
    this.presentLoadingDefault();
     let seq = this.afd.list("items/").remove(item.key);
     seq.then(() => {
      this.presentToast("Item excluído com Sucesso!");
    }, (err) => {
      alert('Erro ao excluir um item');
    });
    }


  update(item: any){
    this.presentLoadingDefault();
    let seq;
    if(item.profilePic != "" || item.profilePic != null){
      seq = this.afd.list("items/").update(item.key, {about: item.about, address: item.address, amount: item.amount, 
        name: item.name, telephone: item.telephone, valueRemoved: item.valueRemoved, profilePic: item.profilePic });
    }else{
      seq = this.afd.list("items/").update(item.key, {about: item.about, address: item.address, amount: item.amount, 
        name: item.name, telephone: item.telephone, valueRemoved: item.valueRemoved });
    }
    seq.then(() => {
      this.presentToast("Item alterado com Sucesso!");
    }, (err) => {
      alert('Erro ao alterar item');
    });

return seq;
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }
  

}
