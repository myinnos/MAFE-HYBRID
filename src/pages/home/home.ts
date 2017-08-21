import { Component, ViewChild } from '@angular/core';
import { NavController,
 NavParams,
AlertController,
ToastController, LoadingController } from 'ionic-angular';

import {HttpProvider} from '../../providers/http/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[HttpProvider]
})
export class HomePage {
posts: string;
img_gender : string;
firstName_Holder : string;
lastName_Holder : string;
@ViewChild('firstName') firstName;
@ViewChild('lastName') lastName;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public alertCtrl: AlertController, public toastCtrl: ToastController,
   private httpProvider:HttpProvider, public loadingCtrl: LoadingController){

   this.posts= "Enter first name and last name details to find person gender!";

  }

getMafe(){

if(this.firstName.value == ""){
this.presentToast("Please enter first name!");
}
else if(this.lastName.value == "" ){
this.presentToast("Please enter last name!");
}else{

let loading = this.loadingCtrl.create({
    //content: 'Please wait...'
    //spinner: 'dots',
  });
loading.present();

this.httpProvider.getJsonData("https://api.namsor.com/onomastics/api/json/gender/"
+this.firstName.value +"/"+this.lastName.value)
.subscribe(
   result => {

        // print result
        this.posts = "We found gender for "+result.firstName +" "+ result.lastName+
        " as "+result.gender+" with scale value "+ result.scale;

        // generate image
        if(result.gender == "male"){
          this.img_gender = "http://www.greatandhra.com/newphotos6/pawankalyan31494671880.jpg";
        } else if(result.gender == "female"){
          this.img_gender = "https://regional.pinkvilla.com/wp-content/uploads/2017/04/imgsai-pallavi.png";
        }

        //this.presentToast(result.gender);
        //console.log("Success : "+ result.gender);
   },
   err =>{
     console.error("Error : "+err);
     this.presentToast("Network Issue! Please check your internet and continue!");
   } ,
   () => {
     loading.dismiss();
     this.firstName_Holder = "";
     this.lastName_Holder = "";
     console.log('getData completed');
   }
 );
}
}

presentToast(message: string) {
   let toast = this.toastCtrl.create({
     message: message,
     duration: 1000,
      position: 'top'   });
   toast.present();
 }


}
