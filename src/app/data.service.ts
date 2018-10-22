import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) { }

/*  getLight() {
    return this.http.get('http://localhost:8000/api/v1/light/latest');
  }

  getHumidity() {
    return this.http.get('http://localhost:8000/api/v1/humidity/latest');
  }

  // getTemperature() {
    // return this.http.get('http://localhost:8000/api/v1/temperature/latest');
  // }

  getAirQuality() {
    return this.http.get('http://localhost:8000/api/v1/air_quality/latest');
  }
*/
}
