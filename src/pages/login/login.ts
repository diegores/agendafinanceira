import { Account } from './../../models/account';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MainPage } from './../pages';
import { User } from '../../providers/providers';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  account = {} as Account;

  isReadyToSigin: boolean;

  form: FormGroup;

  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  
  // Our translated text strings
  private loginErrorString: string;
  
  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public formBuilder: FormBuilder) {
      
      this.account.email = "diego.esteves@gmail.com";
      this.account.password = "12345678";
      
      this.translateService.get('LOGIN_ERROR').subscribe((value) => {
        this.loginErrorString = value;
    })
    
    this.form = formBuilder.group({
        email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSigin = this.form.valid;
    });
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).then((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(LoginPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
