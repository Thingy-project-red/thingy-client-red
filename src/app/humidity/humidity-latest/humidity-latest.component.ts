import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Humidity } from '../humidity.model';
import { HumidityLatestService } from './humidity-latest.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-humidity-latest',
  template: '{{ latest }}%',
  styleUrls: ['../humidity.component.css']
})
export class HumidityLatestComponent implements OnInit, OnDestroy{
  @Input() device: String;

  latest: number;
  private humidSub: Subscription;

  constructor(public humidityService: HumidityLatestService) { }

  ngOnInit() {
    this.humidSub = interval(1000).subscribe(x => {
      this.humidityService.getLatestHumidity(this.device);
      this.humidityService.getHumidityUpdateListener(this.device)
        .subscribe((humidities1: Humidity[]) => {
          this.latest = humidities1[0].humidity;
        });
    })
  }

  ngOnDestroy() {
    this.humidSub.unsubscribe();
  }

}
