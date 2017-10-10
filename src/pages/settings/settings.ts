import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  city:string;
  useGPS:boolean;
  params: any;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage,              
              public alertCtrl: AlertController) {

    this.useGPS = false;
    this.storage.get('city').then(val => {
      if (val!=null) {
        this.city = val;        
      }else{
        this.city = 'Cali';
      }
    });

    this.storage.get('gps').then(val => {
      if (val!=null) {
        this.useGPS = val;        
      }else{
        this.useGPS = false;
      }
    });   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  onSubmit(){
    this.storage.set('city', this.city);
    this.storage.set('gps', this.useGPS); 
    
    if (this.city == "") {
      this.showAlert();
    }
  }

  public notify() {
    console.log("Toggled: "+ this.useGPS); 
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'City is empty!',
      subTitle: 'You must configure a city',
      buttons: ['OK']
    });
    alert.present();
  }

}
