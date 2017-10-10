import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WeatherProvider } from './../../providers/weather/weather';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather;
  city = ''
  public urlimage;
  gps:boolean;
  
  coordenadas : {
    lat:any,
    lon:any
  }

  constructor(public navCtrl: NavController, 
              private weatherService: WeatherProvider,
              private storage: Storage,
              private params: NavParams) {
    this.urlimage = "http://openweathermap.org/img/w/";
    
    this.setParameters();    
  }

  ionViewWillEnter(){
    console.log('refresh data');
    this.setParameters();
  }

  setParameters(){
    this.storage.get('gps').then((val) => {
      if (val!=null) {
        this.gps = val;
      }else{
        console.log('Error getting gps value');
        this.gps = false;
      }
    });

    this.storage.get('city').then((val) => {
      if (val!=null) {
        this.city = val;
      }else{
        console.log('there is not city configured');
        this.city = 'Cali';
      }

      this.callServiceGetWeather();      
    });
    
  }

  callServiceGetWeather(){  

    if (this.gps) {
      console.log('consulta por coordenadas');
      this.weatherService.getWeatherByGeoLocation().subscribe(weather=>{
        this.weather = weather;      
      })
    }else{
      console.log('consulta por city');
      this.weatherService.getWeatherByCity(this.city).subscribe(weather=>{
        this.weather = weather;      
      })
    }
  }



}
