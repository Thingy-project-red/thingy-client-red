import { Component, OnInit, Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { TemperatureLatestService } from './temperature-latest.service';
import { Temperature } from '../temperature.model';

@Component({
  selector: 'app-temperature-latest',
  template: '{{ latest }}°C',
  styleUrls: ['../temperature.component.css']
})
export class TemperatureLatestComponent implements OnInit {
  @Input() device: String;
  latest: number;

  private temperaturesSub: Subscription;

  constructor(public temperatureService: TemperatureLatestService) { }

  ngOnInit() {
    interval(1000).subscribe(x => {
      this.temperatureService.getLatestTemperature(this.device);
      this.temperaturesSub = this.temperatureService.getTemperatureUpdateListener(this.device)
        .subscribe((temperatures: Temperature[]) => {
          this.latest = temperatures[0].temperature;
        });
    })
  }

  ngOnDestroy(){
    this.temperaturesSub.unsubscribe(); 
  }

}
