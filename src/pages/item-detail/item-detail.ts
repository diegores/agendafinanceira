import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController, ToastController, NavParams } from 'ionic-angular';


import { Items } from '../../providers/providers';
import { Item } from '../../models/item';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  @ViewChild('fileInput') fileInput;

  item: Item;

  isReadyToSave: boolean;
    
  
    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, 
      public camera: Camera, public items: Items, public toastCtrl: ToastController, navParams: NavParams ) {
    this.item = navParams.get('item');

    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      telephone: ['', Validators.required],
      address: ['', Validators.required],
      amount: ['', Validators.required],
      valueRemoved: [''],
      about: [''],
      key: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }


  updateItem(){
    this.items.update(this.form.value).then((resp) => {
      if (!this.form.valid) { return; }
        this.viewCtrl.dismiss();
      //this.navCtrl.push(ListMasterPage);
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: "Erro ao inserir",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

}
