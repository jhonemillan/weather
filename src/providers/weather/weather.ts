import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

  example call api
  http://api.openweathermap.org/data/2.5/weather?appid=aabbccbb&q=London,uk
*/
@Injectable()
export class WeatherProvider {
public apikey = 'd2f96b572cc80ac56021b5339c765b09';
public baseurl = 'http://api.openweathermap.org/data/2.5/weather?appid=' + this.apikey + '&';


  constructor(public http: Http, private geolocation: Geolocation) {
    console.log('Hello WeatherProvider Provider');    
  }

  getWeatherByCity(city){
    city += '&units=metric';
    console.log(city);
    return this.http.get(this.baseurl + 'q=' + city).map(res=> res.json());
  }

  getWeatherByGeoLocation(){
    let lat;
    let lon;
    this.geolocation.getCurrentPosition().then((resp) => {
      lat = resp.coords.latitude
      lon = resp.coords.longitude
      console.log('las coordenadas son');
     }).catch((error) => {
       console.log('Error getting location', error);
     });

    return this.http.get(this.baseurl + 'lat=3.44' +'&lon=-76.52' + '&units=metric').map(res=> res.json());
  }

}
