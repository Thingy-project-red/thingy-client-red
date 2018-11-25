import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { TemperatureSeriesService } from './temperature-series.service';
import { Temperature } from '../temperature.model';

@Component({
  selector: 'app-temperature-series',
  templateUrl: './temperature-series.component.html',
  styleUrls: ['../temperature.component.css']
})
export class TemperatureSeriesComponent implements OnInit, OnDestroy {
  @Input() device: String;
  @Input() rangeInSeconds: String;

  temperatures: any;
  private temperaturesSub: Subscription;

  constructor(public temperatureService: TemperatureSeriesService) { }

  ngOnInit() {
    this.temperaturesSub = interval(1000).subscribe(x => {
      this.temperatureService.getTemperatureSeries(this.device, this.rangeInSeconds);
      this.temperatureService.getTemperatureUpdateListener(this.device)
        .subscribe((temperatures: Temperature[]) => {
          this.temperatures = temperatures;
        });
    })
  }

  ngOnDestroy() {
    this.temperaturesSub.unsubscribe();
  }

}
