import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Humidity } from '../humidity.model';
import { HumiditySeriesService } from './humidity-series.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-humidity-series',
  templateUrl: './humidity-series.component.html',
  styleUrls: ['../humidity.component.css']
})
export class HumiditySeriesComponent implements OnInit, OnDestroy {
  @Input() device: String;
  @Input() rangeInSeconds: number;

  humidities: any;
  private humidSub: Subscription;

  constructor(public humidityService: HumiditySeriesService) { }

  ngOnInit() {
    interval(1000).subscribe(x => {
      this.humidityService.getHumiditySeries(this.device, this.rangeInSeconds);
      this.humidSub = this.humidityService.getHumidityUpdateListener(this.device)
        .subscribe((humidities: Humidity[]) => {
          this.humidities = humidities;
        });
    })
  }

  ngOnDestroy() {
    this.humidSub.unsubscribe();
  }

}
