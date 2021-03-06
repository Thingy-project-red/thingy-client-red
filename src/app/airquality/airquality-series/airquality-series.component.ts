import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Air } from '../air.model';
import { AirSeriesService } from './airquality-series.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-airquality-series',
  templateUrl: './airquality-series.component.html',
  styleUrls: ['../air.component.css']
})

export class AirqualitySeriesComponent implements OnInit, OnDestroy {
  @Input() device: String;
  @Input() rangeInSeconds: number;

  airs: any;
  private airSub: Subscription;

  constructor(public airSeriesService: AirSeriesService) { }

  ngOnInit() {
    this.airSub = interval(1000).subscribe(x => {
      this.airSeriesService.getAirSeries(this.device, this.rangeInSeconds);
      this.airSeriesService.getAirsUpdateListener(this.device)
        .subscribe((airs: Air[]) => {
          this.airs = airs;
        });
    })
  }

  ngOnDestroy() {
    this.airSub.unsubscribe();
  }

}
