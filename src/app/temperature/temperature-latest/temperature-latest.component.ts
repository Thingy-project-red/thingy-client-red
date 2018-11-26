import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { TemperatureLatestService } from './temperature-latest.service';
import { Temperature } from '../temperature.model';

@Component({
  selector: 'app-temperature-latest',
  template: '{{ latest }}°C',
  styleUrls: ['../temperature.component.css']
})
export class TemperatureLatestComponent implements OnInit, OnDestroy {
  @Input() device: String;

  private latest: number;
  private temperaturesSub: Subscription;

  constructor(public temperatureService: TemperatureLatestService) { }

  ngOnInit() {
    this.temperaturesSub = interval(1000).subscribe(x => {
      this.temperatureService.getLatestTemperature(this.device);
      this.temperatureService.getTemperatureUpdateListener(this.device)
        .subscribe((temperature: number) => {
          this.latest = temperature;
        });
    })
  }

  ngOnDestroy(){
    this.temperaturesSub.unsubscribe(); 
  }

}
