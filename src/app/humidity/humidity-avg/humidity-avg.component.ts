import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Humidity } from '../humidity.model';
import { HumidityAvgService } from './humidity-avg.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-humidity-avg',
  template: 'ø {{ avg }}%',
  styleUrls: ['../humidity.component.css']
})
export class HumidityAvgComponent implements OnInit, OnDestroy{
  @Input() device: String;
  @Input() rangeInSeconds: number; 

  avg: number;
  private humidSub: Subscription;

  constructor(public humidityService: HumidityAvgService) { }

  ngOnInit() {
    this.humidSub = interval(10000).subscribe(x => {
      this.humidityService.getAvgHumidity(this.device, this.rangeInSeconds);
      this.humidityService.getHumidityUpdateListener(this.device)
        .subscribe((humidities: Humidity[]) => {
          this.avg = Math.round(humidities[0].humidity * 100) / 100;
        });
    })
  }

  ngOnDestroy() {
    this.humidSub.unsubscribe();
  }

}
