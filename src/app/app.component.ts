import { Component } from '@angular/core';
import { DataService } from './data.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  defaultInterval:number = 1;

  light = {};
  humidity = {};
  temperature = {};
  airQuality = {};

  colorCode = "";

  constructor(public dataService: DataService) {

    interval(this.defaultInterval * 1000).subscribe(x => {
      this.dataService.getLight().subscribe( data => {
        this.light = data;
        this.setColors(data);
      });
      this.dataService.getHumidity().subscribe( data => {
        this.humidity = data;
      });
      this.dataService.getTemperature().subscribe( data => {
        this.temperature = data;
      });
      this.dataService.getAirQuality().subscribe( data => {
        this.airQuality = data;
      });
    });

  }

  setColors(data) {
    const r = data.red;
    const g = data.green;
    const b = data.blue;
    const c = data.clear;
    const rRatio = r / (r + g + b);
    const gRatio = g / (r + g + b);
    const bRatio = b / (r + g + b);
    const clearAtBlack = 300;
    const clearAtWhite = 400;
    const clearDiff = clearAtWhite - clearAtBlack;
    let clearNormalized = (c - clearAtBlack) / clearDiff;

    if (clearNormalized < 0) {
      clearNormalized = 0;
    }

    let red = rRatio * 255.0 * 3 * clearNormalized;
    if (red > 255) {
      red = 255;
    }

    let green = gRatio * 255.0 * 3 * clearNormalized;
    if (green > 255) {
      green = 255;
    }

    let blue = bRatio * 255.0 * 3 * clearNormalized;
    if (blue > 255) {
      blue = 255;
    }

    this.colorCode = 'rgb(' + red.toFixed(0) + ', ' + green.toFixed(0) + ', ' + blue.toFixed(0) + ')';
  }

}
