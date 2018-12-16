import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Humidity } from '../humidity.model';
import { HumidityAvgService } from './humidity-avg.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-humidity-avg',
  template: '<span *ngIf=avg><br><span class="card-content-subval">{{ avg }}%</span><span class="subvalues-text">Last Hour</span></span>',
  styleUrls: ['../humidity.component.css', '../../dashboard/dashboard.component.css']
})
export class HumidityAvgComponent implements OnInit, OnDestroy{
  @Input() device: String;
  @Input() rangeInSeconds: number; 

  avg: number;
  private humidSub: Subscription;

  constructor(public humidityService: HumidityAvgService) { }

  ngOnInit() {
    this.humidSub = interval(1000).subscribe(x => {
      this.humidityService.getAvgHumidity(this.device, this.rangeInSeconds);
      this.humidityService.getHumidityUpdateListener(this.device)
        .subscribe((humidities: Humidity[]) => {
          this.avg = Math.round(humidities[0].humidity);
        });
    })
  }

  ngOnDestroy() {
    this.humidSub.unsubscribe();
  }

}
