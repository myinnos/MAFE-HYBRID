import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, private iab: InAppBrowser) {
  }

 openGitHubLink(){
  //window.open('http://www.github.com/myinnos', '_blank', 'location=yes');
  this.iab.create('http://www.github.com/myinnos');
 }

}
