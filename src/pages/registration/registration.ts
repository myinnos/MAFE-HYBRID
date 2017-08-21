import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the RegistrationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

@ViewChild('username') username;
@ViewChild('password') password;

constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
}

openTabPage() {

this.fire.auth.createUserWithEmailAndPassword(this.username.value, this.password.value)
.then(data=> {
//console.log('output:', data);

this.navCtrl.push(TabsPage);

})
.catch(error => {
console.log('login_error:', error);
})
}

showAlert() {
  let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: 'Enter Valid username',
    buttons: ['OK']
  });
  alert.present();
}

ionViewDidLoad() {
  console.log('ionViewDidLoad CheckPage');
}

}
